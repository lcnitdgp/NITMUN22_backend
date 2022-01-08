

function filter_rows() {
    
    
    allFilters = document.querySelectorAll(".table-filter")
    var filter_value_dict = {}

    allFilters.forEach((filter_i) => {
        col_index = filter_i.parentElement.getAttribute('col-index')

        value = filter_i.value
        if (value != "all") {
            filter_value_dict[col_index] = value;
        }
    });

    var col_cell_value_dict = {};

    const rows = document.querySelectorAll("#emp-table tbody tr");
    rows.forEach((row) => {
        var display_row = true;

        allFilters.forEach((filter_i) => {
            col_index = filter_i.parentElement.getAttribute('col-index')
            col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
        })

        for (var col_i in filter_value_dict) {
            filter_value = filter_value_dict[col_i]
            row_cell_value = col_cell_value_dict[col_i]
            
            if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
                display_row = false;
                break;
            }


        }

        if (display_row == true) {
            row.style.display = "table-row"

        } else {
            row.style.display = "none"

        }





    })

}


function display(){
    x =  document.querySelectorAll(".table-filter")


// console.log(x)

// x.forEach((filter_i) => {
//     col_index = filter_i.parentElement.getAttribute("col-index");
//     console.log(col_index)
//     var y = col_index
//     y.addEventListener("change", filter_rows)
    
        // x[col_index-1].addEventListener('change', filter_rows)
for(let i=0;i<x.length;i++){
        x[i].addEventListener('change', filter_rows)
        
     
}
    
  
  
}




 




