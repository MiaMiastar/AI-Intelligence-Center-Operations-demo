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

  // 上架：将状态改为已上架，操作改为下架
  function doOn(id) {
    var row = reportTable && reportTable.querySelector('.table-row[data-id="' + id + '"]');
    if (!row) return;
    var statusEl = row.querySelector(".status");
    var opsEl = row.querySelector(".ops");
    if (statusEl) {
      statusEl.textContent = "已上架";
      statusEl.className = "status success";
    }
    if (opsEl) {
      opsEl.innerHTML =
        '<a href="./report-new.html?id=' + id + '">编辑</a>' +
        '<a href="#" class="op-off" data-id="' + id + '">下架</a>' +
        '<a href="#" class="op-del" data-id="' + id + '">删除</a>';
    }
    applyFilters();
  }

  // 下架：将状态改为未上架，操作改为上架
  function doOff(id) {
    var row = reportTable && reportTable.querySelector('.table-row[data-id="' + id + '"]');
    if (!row) return;
    var statusEl = row.querySelector(".status");
    var opsEl = row.querySelector(".ops");
    if (statusEl) {
      statusEl.textContent = "未上架";
      statusEl.className = "status muted";
    }
    if (opsEl) {
      opsEl.innerHTML =
        '<a href="./report-new.html?id=' + id + '">编辑</a>' +
        '<a href="#" class="op-on" data-id="' + id + '">上架</a>' +
        '<a href="#" class="op-del" data-id="' + id + '">删除</a>';
    }
    applyFilters();
  }

  // 删除：确认后移除该行
  function doDel(id) {
    if (!confirm("确定要删除该报告吗？")) return;
    var row = reportTable && reportTable.querySelector('.table-row[data-id="' + id + '"]');
    if (row && row.parentNode) {
      row.parentNode.removeChild(row);
      applyFilters();
    }
  }

  if (reportTable) {
    reportTable.addEventListener("click", function (e) {
      var t = e.target;
      if (t.tagName !== "A" || !t.getAttribute("href") || t.getAttribute("href") !== "#") return;
      var id = t.getAttribute("data-id");
      if (!id) return;
      e.preventDefault();
      if (t.classList.contains("op-on")) doOn(id);
      else if (t.classList.contains("op-off")) doOff(id);
      else if (t.classList.contains("op-del")) doDel(id);
    });
  }

  applyFilters();
})();
