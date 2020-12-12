/* const filter = {
	"locations": [ "Birmingham", "London", "Manchester", "Glasgow" ],
	"classes": [ "West Midlands class 1",  "West Midlands class 2", "London class 1", "London class 2", "Manchester class 1", "Glasgow class 1" ],
	"performance": [ "Good", "Average", "Poor" ],
}; */

const filter = {
	"locations": [ {
							 "city": "Birmingham",
							 "classes": [ "West Midlands class 1",  "West Midlands class 2"],
						  },
						  {
							  "city": "London",
							 "classes": [ "London class 1",  "London class 2"],
						  },
						  {
							  "city": "Manchester",
							 "classes": [ "Manchester class 1" ],
						  },
						  {
							  "city": "Glasgow",
							 "classes": [ "Glasgow class 1" ],
						  },
	],
	"performance": [ "Good", "Average", "Poor" ],
};

export default filter;