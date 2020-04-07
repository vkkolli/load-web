import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  rows = [
    {
      age: "01:41",
      avail: "02/25",
      truck: "R",
      fp: "F",
      dho: "70",
      origin: "Athens, GA",
      trip: "772",
      destination: "Chicago, IL",
      dhd: 0,
      company: "Tir-Pl Trucking Inc",
      contact: "(847)233-0552",
      length: "53 ft",
      weight: "40.000 lbs"
    },
    {
      age: "01:41",
      avail: "02/25",
      truck: "R",
      fp: "F",
      dho: "70",
      origin: "Athens, GA",
      trip: "772",
      destination: "Chicago, IL",
      dhd: 0,
      company: "Tir-Pl Trucking Inc",
      contact: "(847)233-0552",
      length: "53 ft",
      weight: "40.000 lbs"
    },
    {
      age: "01:41",
      avail: "02/25",
      truck: "R",
      fp: "F",
      dho: "70",
      origin: "Athens, GA",
      trip: "772",
      destination: "Chicago, IL",
      dhd: 0,
      company: "Tir-Pl Trucking Inc",
      contact: "(847)233-0552",
      length: "53 ft",
      weight: "40.000 lbs"
    },
    {
      age: "01:41",
      avail: "02/25",
      truck: "R",
      fp: "F",
      dho: "70",
      origin: "Athens, GA",
      trip: "772",
      destination: "Chicago, IL",
      dhd: 0,
      company: "Tir-Pl Trucking Inc",
      contact: "(847)233-0552",
      length: "53 ft",
      weight: "40.000 lbs"
    }
  ];
  columns = [
    { name: "Age", prop: "age" },
    { name: "Avail", prop: "avail" },
    { name: "Truck", prop: "truck" },
    { name: "F/P", prop: "fp" },
    { name: "DH-O", prop: "dho" },
    { name: "Origin", prop: "origin" },
    { name: "Trip", prop: "trip" },
    { name: "Destination", prop: "destination" },
    { name: "DH-D", prop: "dhd" },
    { name: "Company", prop: "company" },
    { name: "Contact", prop: "contact" },
    { name: "Length", prop: "length" },
    { name: "Weight", prop: "weight" }
  ];
  constructor() {}

  ngOnInit(): void {}
}
