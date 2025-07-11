const now = new Date();
    const MonthList = {
        January: [31, 1,"JAN"],
        February: [28, 2,"FEB"],  // or 29 in leap years
        March: [31, 3,"MAR"],
        April: [30, 4,"APR"],
        May: [31, 5,"MAY"],
        June: [30, 6,"JUN"],
        July: [31, 7,"JUL"],
        August: [31, 8,"AUG"],
        September: [30, 9,"SEP"],
        October: [31, 10,"OCT"],
        November: [30, 11,"NOV"],
        December: [31, 12,"DEC"]
    };

    let currentSheet = 3

    
    for (let month in MonthList) {
        let NewMonth = document.createElement("div")
        NewMonth.classList.add("Container")
        NewMonth.dataset.monthName = month
        document.body.appendChild(NewMonth)

        CreateMonth(MonthList[month][0], NewMonth, MonthList[month][1])

        let MonthName = document.createElement("div")
        MonthName.classList.add("month-name")
        MonthName.textContent = `${MonthList[month][2]}`;
        NewMonth.appendChild(MonthName)
    }

    function CreateMonth(dayInMonth, CurrentCalendar, TodayMonth) {

        for (i=0; i < dayInMonth; i++) {
            let Days = document.createElement("div");
            Days.classList.add("days");
            CurrentCalendar.appendChild(Days)
            Days.textContent = `${i+1}`;
            if ((i+1) == now.getDate()) {
                if (TodayMonth == now.getMonth()+1) {
                    Days.classList.add("current-day");
                }
            }

            if ((i+1) < 11 || (i+1) > 19) {
                if ((i+1) % 10 == 1) {
                    let SupNum = document.createElement("sup");
                    Days.appendChild(SupNum);
                    SupNum.textContent = "st";

                } else if ((i+1) % 10 == 2) {
                    let SupNum = document.createElement("sup");
                    Days.appendChild(SupNum);
                    SupNum.textContent = "nd";

                } else if ((i+1) % 10 == 3) {
                    let SupNum = document.createElement("sup");
                    Days.appendChild(SupNum);
                    SupNum.textContent = "rd";
                };
            };
        };
        for (i=0; i < (35-dayInMonth); i++) {
            let Days = document.createElement("div");
            Days.classList.add("other-days");
            CurrentCalendar.appendChild(Days)
            Days.textContent = `${i+1}`;
            if ((i+1) % 10 == 1) {
                    let SupNum = document.createElement("sup");
                    Days.appendChild(SupNum);
                    SupNum.textContent = "st";

            } else if ((i+1) % 10 == 2) {
                let SupNum = document.createElement("sup");
                Days.appendChild(SupNum);
                SupNum.textContent = "nd";
                
            } else if ((i+1) % 10 == 3) {
                let SupNum = document.createElement("sup");
                Days.appendChild(SupNum);
                SupNum.textContent = "rd";
            };
        };
    };

    const CalendarMonthList = document.querySelectorAll(".Container")

    // CreateMonth(31, CalendarMonthList)
    function LoadCalendar() {

        for (let month of CalendarMonthList) {
            let currentMonth = Array.from(CalendarMonthList).indexOf(month)

            if (currentMonth == currentSheet) {
                month.style.top = "50%";
                month.style.transform = "scale(1) translateX(-50%) translateY(-50%)";
                month.style.zIndex = "2";
                month.style.filter = "blur(0px)";


            } else if (currentMonth < currentSheet) {
                month.style.top = `${-40 * Math.abs(currentSheet - currentMonth)}%`;
                month.style.transform = "scale(0.8) translateX(-62.5%) translateY(-50%)";
                month.style.zIndex = "1";
                month.style.filter = "blur(5px)";


            } else if (currentMonth > currentSheet) {
                month.style.top = `${122.5 * Math.abs(currentSheet - currentMonth)}%`;
                month.style.transform = "scale(0.8) translateX(-62.5%) translateY(-50%)";
                month.style.zIndex = "1";
                month.style.filter = "blur(5px)";



            } if (![currentSheet, currentSheet+1, currentSheet-1].includes(currentMonth)) {
                month.style.zIndex = "0";
                month.style.filter = "blur(10px)";
            }
            
        }
    }

    window.addEventListener("wheel", (event) => {
        if (event.deltaY < 0) {
            currentSheet--
            if (currentSheet < 1) {
                currentSheet = 0
            };
            LoadCalendar()

        } else if (event.deltaY > 0) {
            currentSheet++
            if (currentSheet > 11) {
                currentSheet = 11
            }
            LoadCalendar()
        }
    });
    
    LoadCalendar()


