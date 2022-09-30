module.exports.ageCalculator = function (fecha_nacimiento) {  
    
    var dob = new Date(fecha_nacimiento); //formato mm/dd/yyyy)

    //extract the year, month, and date from user date input  
    var dobYear = dob.getYear();  
    var dobMonth = dob.getMonth();  
    var dobDate = dob.getDate();  
      
    //get the current date from the system  
    var now = new Date();  
    //extract the year, month, and date from current date  
    var currentYear = now.getYear();  
    var currentMonth = now.getMonth();  
    var currentDate = now.getDate();  
      
    //declare a variable to collect the age in year, month, and days  
    var age = {};  

    //get years  
    var yearAge = currentYear - dobYear;  
      
    //get months  
    var monthAge = 0
    if (currentMonth >= dobMonth)  
        //get months when current month is greater  
        monthAge = currentMonth - dobMonth;  
    else {  
        yearAge--;  
        monthAge = 12 + currentMonth - dobMonth;  
    }  
    var dateAge = 0
    //get days  
    if (currentDate >= dobDate)  
        //get days when the current date is greater  
        dateAge = currentDate - dobDate;  
    else {  
        monthAge--;  
        dateAge = 31 + currentDate - dobDate;  
  
        if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
        }  
    }  
    //group the age in a single variable  
    age = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
    };
      
    return age;
               
    
}  