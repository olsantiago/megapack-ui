const megapackItems = [
  {
    key: "MP2XL",
    name: "Megapack 2XL",
    type: "battery",
    floor_dimension: {
      width: 40,
      length: 10
    },
    energy: 4,
    cost: 120000,
    release_date: 2022
  },
  {
    key: "MP2",
    name: "Megapack 2",
    type: "battery",
    floor_dimension: {
      width: 30,
      length: 10
    },
    energy: 3,
    cost: 80000,
    release_date: 2021
  },
  {
    key: "MP",
    name: "Megapack",
    type: "battery",
    floor_dimension: {
      width: 30,
      length: 10
    },
    energy: 2,
    cost: 50000,
    release_date: 2005
  },
  {
    key: "PP",
    name: "Powerpack",
    type: "battery",
    floor_dimension: {
      width: 10,
      length: 10
    },
    energy: 1,
    cost: 20000,
    release_date: 2000
  },
  {
    key: "TR",
    name: "Transformer",
    type: "transformer",
    floor_dimension: {
      width: 10,
      length: 10
    },
    energy: -0.25,
    cost: 10000,
    release_date: null
  }
]

export default megapackItems;
