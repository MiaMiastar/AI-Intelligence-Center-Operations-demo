(function () {
  var searchInput = document.getElementById("searchInput");
  var filterCategory = document.getElementById("filterCategory");
  var filterStatus = document.getElementById("filterStatus");
  var courseTable = document.getElementById("courseTable");
  var paginationInfo = document.getElementById("paginationInfo");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  function getRows() {
    return courseTable ? courseTable.querySelectorAll(".table-row:not(.table-head)") : [];
  }

  function applyFilters() {
    var keyword = (searchInput && searchInput.value) ? searchInput.value.trim().toLowerCase() : "";
    var category = filterCategory ? filterCategory.value : "";
    var status = filterStatus ? filterStatus.value : "";
    var rows = getRows();
    var visible = 0;

    rows.forEach(function (row) {
      var name = (row.querySelector(".name") && row.querySelector(".name").textContent) || "";
      var cat = (row.children[1] && row.children[1].textContent) || "";
      var st = (row.querySelector(".status") && row.querySelector(".status").textContent) || "";
      var expert = (row.children[3] && row.children[3].textContent) || "";

      var matchKeyword = !keyword || name.toLowerCase().indexOf(keyword) >= 0 || cat.toLowerCase().indexOf(keyword) >= 0 || expert.toLowerCase().indexOf(keyword) >= 0;
      var matchCategory = !category || cat.indexOf(category) >= 0;
      var matchStatus = !status || st.indexOf(status) >= 0;

      if (matchKeyword && matchCategory && matchStatus) {
        row.style.display = "";
        visible++;
      } else {
        row.style.display = "none";
      }
    });

    if (paginationInfo) {
      paginationInfo.textContent = "共 " + visible + " 条";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
  if (filterCategory) {
    filterCategory.addEventListener("change", applyFilters);
  }
  if (filterStatus) {
    filterStatus.addEventListener("change", applyFilters);
  }

  applyFilters();
})();
