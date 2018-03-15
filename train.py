import json
from sklearn.linear_model import SGDClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.gaussian_process.kernels import RBF
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis

metrics = [ "loan_amount_000s", "number_of_1_to_4_family_units",
				  "number_of_owner_occupied_units", "minority_population", "population",
				  "tract_to_msamd_income" ]

names = ["Nearest Neighbors", "Linear SVM", "RBF SVM", "Gaussian Process",
         "Decision Tree", "Random Forest", "Neural Net", "AdaBoost",
         "Naive Bayes", "QDA"]

classifiers = [
    KNeighborsClassifier(3),
    SVC(kernel="linear", C=0.025),
    SVC(gamma=2, C=1),
    GaussianProcessClassifier(1.0 * RBF(1.0)),
    DecisionTreeClassifier(max_depth=5),
    RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
    MLPClassifier(alpha=1),
    AdaBoostClassifier(),
    GaussianNB(),
    QuadraticDiscriminantAnalysis()]

with open('hmda_lar_good.json') as json_data:
	d = json.load(json_data)["results"]

	# Process data - find mins and maxes

	mins = {}
	maxes = {}
	for m in metrics:
		mins[m] = d[0][m]
		maxes[m] = d[0][m]

	for datum in d:
		for m in metrics:
			if datum[m] < mins[m]:
				mins[m] = datum[m]
			if datum[m] > maxes[m]:
				maxes[m] = datum[m]

	data = []
	labels = []
	for datum in d:
		new_datum = []
		for m in metrics:
			new_datum.append((datum[m] - mins[m]) / (maxes[m] - mins[m]) * 20)
		if datum["action_taken"] == 1:
			labels.append(1)
		else:
			labels.append(0)
		data.append(new_datum)

	for name, clf in zip(names, classifiers):
		clf.fit(data, labels)
		# print clf.coef_
		# print clf.intercept_
		print name
		print clf.score(data, labels)

	clf = SGDClassifier(loss="hinge", penalty="l2")
	clf.fit(data, labels)
	print clf.coef_
	print clf.intercept_
	print "SGD"
	print clf.score(data, labels)