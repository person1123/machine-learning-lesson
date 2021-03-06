{ "_links": [ { "rel": "self", "href": "/data/hmda/slice/hmda_lar/metadata" },
			{ "rel": "up", "href": "/data/hmda" } ],
	"references":
	{ "co_applicant_ethnicity_name":
		{ "column": "co_applicant_ethnicity",
		  "concept": "ethnicity", "value": "name" },
	  "county_name": { "column": "fips_code", "concept": "fips", "value": "county_name" },
	  "lien_status_name": { "column": "lien_status", "concept": "lien_status", "value": "name" },
	  "applicant_race_name_2": { "column": "applicant_race_2", "concept": "race", "value": "name" },
	  "preapproval_name": { "column": "preapproval", "concept": "preapproval", "value": "name" },
	  "applicant_race_name_1": { "column": "applicant_race_1", "concept": "race", "value": "name" },
	  "action_taken_name": { "column": "action_taken", "concept": "action_taken", "value": "name" },
	  "applicant_race_name_5": { "column": "applicant_race_5", "concept": "race", "value": "name" },
	  "denial_reason_name_1": { "column": "denial_reason_1", "concept": "denial_reason", "value": "name" },
	  "applicant_ethnicity_name": { "column": "applicant_ethnicity", "concept": "ethnicity", "value": "name" },
	  "owner_occupancy_name": { "column": "owner_occupancy", "concept": "owner_occupancy", "value": "name" },
	  "loan_purpose_name": { "column": "loan_purpose", "concept": "loan_purpose", "value": "name" },
	  "applicant_race_name_4": { "column": "applicant_race_4", "concept": "race", "value": "name" },
	  "hoepa_status_name": { "column": "hoepa_status", "concept": "hoepa_status", "value": "name" },
	  "co_applicant_race_name_1": { "column": "co_applicant_race_1", "concept": "race", "value": "name" },
	  "state_abbr": { "column": "state_code", "concept": "state_code", "value": "abbr" },
	  "denial_reason_name_3": { "column": "denial_reason_3", "concept": "denial_reason", "value": "name" },
	  "edit_status_name": { "column": "edit_status", "concept": "edit_status", "value": "name" },
	  "loan_type_name": { "column": "loan_type", "concept": "loan_type", "value": "name" },
	  "applicant_sex_name": { "column": "applicant_sex", "concept": "sex", "value": "name" },
	  "applicant_race_name_3": { "column": "applicant_race_3", "concept": "race", "value": "name" },
	  "state_name": { "column": "state_code", "concept": "state_code", "value": "name" },
	  "co_applicant_race_name_5": { "column": "co_applicant_race_5", "concept": "race", "value": "name" },
	  "co_applicant_sex_name": { "column": "co_applicant_sex", "concept": "sex", "value": "name" },
	  "purchaser_type_name": { "column": "purchaser_type", "concept": "purchaser_type", "value": "name" },
	  "co_applicant_race_name_3": { "column": "co_applicant_race_3", "concept": "race", "value": "name" },
	  "msamd_name": { "column": [ "msamd", "as_of_year" ], "concept": "msamd", "id": [ "code", "year" ], "value": "name" },
	  "agency_name": { "column": "agency_code", "concept": "agency_code", "value": "name" },
	  "co_applicant_race_name_4": { "column": "co_applicant_race_4", "concept": "race", "value": "name" },
	  "agency_abbr": { "column": "agency_code", "concept": "agency_code", "value": "abbr" },
	  "denial_reason_name_2": { "column": "denial_reason_2", "concept": "denial_reason", "value": "name" },
	  "property_type_name": { "column": "property_type", "concept": "property_type", "value": "name" },
	  "co_applicant_race_name_2": { "column": "co_applicant_race_2", "concept": "race", "value": "name" }
	 },
	 "metrics": [ "hud_median_family_income", "loan_amount_000s", "number_of_1_to_4_family_units",
				  "number_of_owner_occupied_units", "minority_population", "population", "rate_spread",
				  "tract_to_msamd_income" ],
	 "dimensions": [ "action_taken", "action_taken_name", "agency_code", "agency_abbr", "agency_name",
	 				 "applicant_ethnicity", "applicant_ethnicity_name", "applicant_income_000s", "applicant_race_1",
	 				 "applicant_race_2", "applicant_race_3", "applicant_race_4", "applicant_race_5",
	 				 "applicant_race_name_1", "applicant_race_name_2", "applicant_race_name_3", "applicant_race_name_4",
	 				 "applicant_race_name_5", "applicant_sex", "applicant_sex_name", "application_date_indicator",
	 				 "as_of_year", "census_tract_number", "co_applicant_ethnicity", "co_applicant_ethnicity_name",
	 				 "co_applicant_race_1", "co_applicant_race_2", "co_applicant_race_3", "co_applicant_race_4",
	 				 "co_applicant_race_5", "co_applicant_race_name_1", "co_applicant_race_name_2",
	 				 "co_applicant_race_name_3", "co_applicant_race_name_4", "co_applicant_race_name_5",
	 				 "co_applicant_sex", "co_applicant_sex_name", "county_code", "county_name", "denial_reason_1",
	 				 "denial_reason_2", "denial_reason_3", "denial_reason_name_1", "denial_reason_name_2",
	 				 "denial_reason_name_3", "edit_status", "edit_status_name", "hoepa_status", "hoepa_status_name",
	 				 "lien_status", "lien_status_name", "loan_purpose", "loan_purpose_name", "loan_type", "loan_type_name",
	 				 "msamd", "msamd_name", "owner_occupancy", "owner_occupancy_name", "preapproval", "preapproval_name",
	 				 "property_type", "property_type_name", "purchaser_type", "purchaser_type_name", "respondent_id",
	 				 "sequence_number", "state_code", "state_abbr", "state_name" ],
	 "indexes": [ "action_taken", "agency_code", "agency_abbr", "applicant_ethnicity", "applicant_income_000s",
	  			  "applicant_race_1", "applicant_race_2", "applicant_race_3", "applicant_race_4", "applicant_race_5",
	  			  "applicant_sex", "application_date_indicator", "as_of_year", "census_tract_number",
	  			  "co_applicant_ethnicity", "co_applicant_race_1", "co_applicant_race_2", "co_applicant_race_3",
	  			  "co_applicant_race_4", "co_applicant_race_5", "co_applicant_sex", "county_code", "denial_reason_1",
	  			  "denial_reason_2", "denial_reason_3", "edit_status", "hoepa_status", "loan_amount_000s", "lien_status",
	  			  "loan_purpose", "loan_type", "msamd", "owner_occupancy", "preapproval", "property_type", "purchaser_type",
	  			  "rate_spread", "respondent_id", "sequence_number", "state_code", "state_abbr",
	  			  [ "as_of_year", "property_type", "action_taken", "owner_occupancy", "lien_status" ],
	  			  [ "as_of_year", "state_code", "action_taken" ],
	  			  [ "property_type", "owner_occupancy", "lien_status" ],
	  			  [ "respondent_id", "agency_code" ],
	  			  [ "state_code", "county_code" ] ],
	 "info": { "name": "HMDA Loan Application Records (LAR)",
	 			"description": "The HMDA LAR data, with code sheet lookups added." },
	 			"slice": "hmda_lar", "dataset": "hmda", "id": "hmda/hmda_lar" }
