export let production = {
    "worker": {
        "produce": {
            "worker": 1,
        },
        "consume": {
            "housing": 1,
			"food": 0.1,
			"water": 0.05,
			"salad": 1/37,
			"grace": 1/37,
			"apple": 1/37,
			"medicine": 0.1,
			"law": 0.1,
        }
    },
    "housing": {
        "produce": {
			"requireSpace": 4,
            "housing": 52,
        },
        "consume": {
            "energy": 8,
        }
    },
	"energy1": {
        "produce": {
			"requireSpace": 4,
            "energy": 40,
        },
        "consume": {
            "worker": 4,
        }
    },
    "energy2": {
        "produce": {
			"requireSpace": 4,
            "energy": 40,
        },
        "consume": {
            "worker": 4,
        }
    },
    "energy3": {
        "produce": {
			"requireSpace": 6,
            "energy": 190,
        },
        "consume": {
            "worker": 25,
            "uran": 8,
			"ecology": 18,
        }
    },
    "uran": {
        "produce": {
			"requireSpace": 4,
            "uran": 6,
            "water": 17,
            "metal": 11,
        },
        "consume": {
            "worker": 25,
            "energy": 18,
			"ecology": 18,
        }
    },
	"water": {
        "produce": {
			"requireSpace": 2,
            "water": 43,
        },
        "consume": {
            "worker": 7,
            "energy": 7,
			"ecology": 1,
        }
    },
	"water3": {
        "produce": {
			"requireSpace": 2,
            "water": 7,
        },
        "consume": {
            "worker": 5,
            "energy": 4,
        }
    },
	"water2": {
        "produce": {
			"requireSpace": 4,
            "uran": 6,
            "water": 17,
            "metal": 11,
        },
        "consume": {
            "worker": 25,
            "energy": 18,
			"ecology": 18,
        }
    },
	"ecology": {
		"produce": {
			"requireSpace": 1,
            "ecology": 5,
            "estetic": 0.2,
        },
        "consume": {
            "worker": 2,
            "energy": 5,
        }
	},
	"food1": {
		"produce": {
			"requireSpace": 4,
            "food": 14,
        },
        "consume": {
            "worker": 4,
			"water": 4,
        }
    },
    "food2": {
		"produce": {
			"requireSpace": 4,
            "food": 14,
        },
        "consume": {
            "worker": 4,
            "energy": 12,
			"water": 4,
        }
	},
	"salad": {
		"produce": {
			"requireSpace": 2,
            "salad": 12,
        },
        "consume": {
            "worker": 3,
            "energy": 6,
			"water": 5,
        }
	},
	"grace": {
		"produce": {
			"requireSpace": 2,
            "grace": 12,
        },
        "consume": {
            "worker": 3,
            "energy": 6,
			"water": 6,
        }
	},
	"apple": {
		"produce": {
			"requireSpace": 4,
            "apple": 22,
			"ecology": 4,
        },
        "consume": {
            "worker": 3,
			"water": 6,
        }
	},
	"medicine": {
		"produce": {
			"requireSpace": 1,
            "medicine": 6,
        },
        "consume": {
            "worker": 4,
			"energy": 2,
        }
	},
	"law": {
		"produce": {
			"requireSpace": 2,
            "law": 30,
        },
        "consume": {
            "worker": 10,
			"energy": 3,
        }
	},
};