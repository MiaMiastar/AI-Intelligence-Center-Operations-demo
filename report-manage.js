(function () {
  var searchInput = document.getElementById("reportSearch");
  var filterType = document.getElementById("filterType");
  var filterStatus = document.getElementById("filterStatus");
  var reportTable = document.getElementById("reportTable");
  var paginationInfo = document.getElementById("paginationInfo");

  function getRows() {
    return reportTable ? reportTable.querySelectorAll(".table-row:not(.table-head)") : [];
  }

  function getRowData(row) {
    var titleEl = row.querySelector(".report-title-cell .name");
    var spans = row.querySelectorAll("span:not(.report-title-cell span):not(.status):not(.ops)");
    return {
      title: (titleEl && titleEl.textContent) || "",
      type: (row.children[1] && row.children[1].textContent) || "",
      relation: (row.children[2] && row.children[2].textContent) || "",
      author: (row.children[3] && row.children[3].textContent) || "",
      status: (row.querySelector(".status") && row.querySelector(".status").textContent) || ""
    };
  }

  function applyFilters() {
    var keyword = (searchInput && searchInput.value) ? searchInput.value.trim().toLowerCase() : "";
    var typeVal = filterType ? filterType.value : "";
    var statusVal = filterStatus ? filterStatus.value : "";
    var rows = getRows();
    var visible = 0;

    rows.forEach(function (row) {
      var d = getRowData(row);
      var matchKeyword = !keyword ||
        (d.title && d.title.toLowerCase().indexOf(keyword) >= 0) ||
        (d.author && d.author.toLowerCase().indexOf(keyword) >= 0) ||
        (d.relation && d.relation.toLowerCase().indexOf(keyword) >= 0);
      var matchType = !typeVal || (d.type && d.type.indexOf(typeVal) >= 0);
      var matchStatus = !statusVal || (d.status && d.status.indexOf(statusVal) >= 0);

      if (matchKeyword && matchType && matchStatus) {
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
  if (filterType) {
    filterType.addEventListener("change", applyFilters);
  }
  if (filterStatus) {
    filterStatus.addEventListener("change", applyFilters);
  }

  applyFilters();
})();
