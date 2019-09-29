//this function for event handlers for HTML elements on the page:

const initiatePage = () => {
  docImg = document.getElementsByTagName("img");
  divImg = document.getElementById("div1").getElementsByTagName("img");
  docPara = document.getElementsByTagName("p");
  divPara = document.getElementById("div3").getElementsByTagName("p");

  Array.prototype.forEach.call(divImg, e => {
    e.addEventListener("mouseenter", function() {
      this.style.width = "100px";
      this.style.height = "100px";
    });

    //optional, convert back to original size when mouse leaves again....
    // e.addEventListener("mouseleave", function() {
    //   this.style.width = "308px";
    //   this.style.height = "208px";
    // });
  });

  Array.prototype.forEach.call(docImg, i => {
    i.addEventListener("click", function() {
      this.style.border = "4px solid red";
    });
  });

  Array.prototype.forEach.call(docPara, p => {
    p.addEventListener("dblclick", function() {
      this.style.color = "blue";
    });
  });

  Array.prototype.forEach.call(divPara, d => {
    d.addEventListener("mouseenter", function() {
      this.style.backgroundColor = "yellow";
    });

    d.addEventListener("mouseleave", function() {
      this.style.backgroundColor = "pink";
    });
  });
};

//this function called by generate calender and passed a unique date to parse each iteration

const getDayOfTheWeek = (month, day, year) => {
  const monthObj = {
    "1": 1,
    "2": 4,
    "3": 4,
    "4": 0,
    "5": 2,
    "6": 5,
    "7": 0,
    "8": 3,
    "9": 6,
    "10": 1,
    "11": 4,
    "12": 6
  };

  const daynames = {
    "-1": "Friday",
    "0": "Saturday",
    "1": "Sunday",
    "2": "Monday",
    "3": "Tuesday",
    "4": "Wednesday",
    "5": "Thursday"
  };

  //last two digits of year
  // a: check how many times 12 is divisible by this
  // b: get remainder of last two and 12
  // c: from this remainder, find how many "4s"
  // get sum of a + b + c + day of month (eg; 24) + "month code" from monthObj

  let strDate = year.toString();
  let workingVal = parseInt(strDate.substring(2));
  let a = Math.floor(workingVal / 12);
  let b = Math.floor(workingVal % 12);
  let c = Math.floor(b / 4);

  let sum = a + b + c + day + monthObj[month];
  let sum2 = sum % 7;

  //conditions to modify for leap year, and to work in 2000s'

  let leapCheck = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

  if (leapCheck && month < 3) {
    sum2 -= 1;
  }

  if (year > 1999) {
    sum2 -= 1;
  } else if (year > 1799 && year < 1900) {
    sum2 += 2;
  } else if (year > 1699 && year < 1800) {
    sum2 += 4;
  }

  return daynames[sum2];
};

// -----------------------------------------------------------------
//this function called on page load,  calls getDayOfTheWeek

const generateCalender = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const today = new Date();

  //this used to parse/round to single day (not seconds, minutes ect...)
  const oneDay = 24 * 60 * 60 * 1000;

  let months = [];

  for (let m = 1; m <= 12; m++) {
    months.push(m);
  }

  //datePass to be reversed when "days before" becomes "days until" in console.log
  //reverseCondition to meet the correct condition if the day is "today", then revert to "days until"

  let datePass = false;
  let reverseCondition = true;

  //for each "month" iterate all days in said month
  // pass each date to call back to get correct "name" of day (ie; tuesday)
  // get all these values and print them in the correct console.log depending on days relation to today

  for (let i = 0; i < months.length; i++) {
    for (let y = 1; y <= daysInMonth[i]; y++) {
      let dayName = getDayOfTheWeek(months[i], y, 2019);
      let day_value = Math.round(
        Math.abs((new Date(2019, i, y) - today) / oneDay)
      );

      if (day_value == 1 && reverseCondition) {
        datePass = true;
        console.log(
          `Wait a second... ${monthNames[i]} ${y}, 2019 is a ${dayName} TODAY!!!`
        );
        reverseCondition = false;
      } else if (datePass && day_value === 0) {
        console.log(
          ` ${monthNames[i]} ${y}, 2019 will be a ${dayName} in ${day_value +
            1} day `
        );
      } else if (datePass) {
        console.log(
          ` ${monthNames[i]} ${y}, 2019 will be a ${dayName} in ${day_value +
            1} days `
        );
      } else {
        console.log(
          ` ${monthNames[i]} ${y}, 2019, was a ${dayName} ${day_value -
            1} days ago `
        );
      } //final condition
    } //inner loop
  } //opening "month loop"
  console.log("end");
};
