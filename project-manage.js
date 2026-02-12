(function () {
  function escapeHtml(str) {
    if (str == null) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  const PROJECTS = [
    { id: "p1", status: "审核通过", name: "某汽车零部件采购与供应商协同", belongUnit: "某汽车 Tier1 集团", projectStage: "商业化", trlLevel: "TRL 7", selfLevel: "A", resultTypes: ["软件系统", "平台产品", "技术方案"], deployForm: "混合", valueProposition: "面向汽车零部件制造，基于供应商协同平台与绩效体系，解决订单交付不透明与成本质量平衡难题。", techHighlights: ["供应商门户与订单协同", "绩效指标与考核体系", "战略供应商分级与联合改善"], landingCaseCount: 3, typicalClient: "某整车厂 Tier1 供应商", keyMetric: "OTIF 78%→92%", applyTime: "2024-06-15", industry: "汽车" },
    { id: "p2", status: "专家评审", name: "快消企业 S&OP 与需求预测体系", belongUnit: "某快消企业供应链中心", projectStage: "商业化", trlLevel: "TRL 8", selfLevel: "A", resultTypes: ["算法模型", "软件系统"], deployForm: "云", valueProposition: "面向快消多 SKU 多渠道场景，基于需求预测与 S&OP 流程，解决产销协同不足与库存缺货矛盾。", techHighlights: ["需求预测流程与模型", "S&OP 会议与决策机制", "库存与生产计划联动"], landingCaseCount: 5, typicalClient: "某区域乳品企业", keyMetric: "预测准确率提升至 85%", applyTime: "2024-05-20", industry: "快消" },
    { id: "p3", status: "待初审", name: "电商仓配网络与 WMS 实施", belongUnit: "某电商物流科技公司", projectStage: "商业化", trlLevel: "TRL 8", selfLevel: "A", resultTypes: ["软件系统", "平台产品"], deployForm: "云", valueProposition: "面向电商履约场景，基于多仓布局与 WMS 流程再造，解决单仓瓶颈与大促爆仓、拣货效率低问题。", techHighlights: ["多仓布局与分仓策略", "WMS 上线与流程再造", "拣货策略与波次优化"], landingCaseCount: 8, typicalClient: "某服饰电商", keyMetric: "仓内作业效率提升 40%", applyTime: "2024-07-01", industry: "电商" },
    { id: "p4", status: "初审中", name: "医药流通供应链网络与库存优化", belongUnit: "某医药流通企业", projectStage: "试点", trlLevel: "TRL 6", selfLevel: "B", resultTypes: ["技术方案", "软件系统", "算法模型"], deployForm: "混合", valueProposition: "面向医药多级分销与温控合规场景，基于区域 DC 与多级库存策略，解决网络响应慢与库存服务水平兼顾。", techHighlights: ["区域 DC 规划与选址", "多级库存与安全库存", "温控与追溯系统"], landingCaseCount: 2, typicalClient: "某省医药商业公司", keyMetric: "库存周转下降 18 天", applyTime: "2024-04-10", industry: "医药" },
    { id: "p5", status: "已归档", name: "制造企业主数据与流程治理", belongUnit: "某制造集团信息中心", projectStage: "商业化", trlLevel: "TRL 7", selfLevel: "A", resultTypes: ["技术方案", "软件系统"], deployForm: "本地", valueProposition: "面向制造多系统多部门场景，基于主数据治理与流程 RACI，解决主数据混乱与系统集成困难。", techHighlights: ["主数据治理组织与规范", "流程梳理与 RACI", "主数据平台与清洗"], landingCaseCount: 4, typicalClient: "某装备制造集团", keyMetric: "主数据准确率 72%→98%", applyTime: "2024-03-22", industry: "制造" },
    { id: "p6", status: "初审未通过", name: "全球供应链风险与韧性建设", belongUnit: "某制造企业采购中心", projectStage: "试点", trlLevel: "TRL 6", selfLevel: "B", resultTypes: ["技术方案", "算法模型"], deployForm: "云", valueProposition: "面向全球化采购与生产场景，基于供应风险地图与多源近岸策略，解决供应集中与应急响应缺失。", techHighlights: ["供应风险地图与评估", "多源与近岸策略", "BCP 与应急演练"], landingCaseCount: 1, typicalClient: "", keyMetric: "供应中断恢复 30 天→10 天", applyTime: "2024-08-05", industry: "制造" },
    { id: "p7", status: "审核通过", name: "零售企业采购与品类管理", belongUnit: "某零售连锁总部", projectStage: "商业化", trlLevel: "TRL 7", selfLevel: "A", resultTypes: ["软件系统", "技术方案", "算法模型", "平台产品"], deployForm: "混合", valueProposition: "面向零售多品类多供应商场景，基于品类策略与采购补货联动，解决品类策略不清与滞销缺货并存。", techHighlights: ["品类角色与策略矩阵", "采购计划与补货联动", "供应商绩效与淘汰"], landingCaseCount: 6, typicalClient: "某区域超市连锁", keyMetric: "库存周转下降 10 天", applyTime: "2024-02-14", industry: "零售" },
    { id: "p8", status: "审核未通过", name: "电子制造需求与生产计划联动", belongUnit: "某电子制造企业计划部", projectStage: "商业化", trlLevel: "TRL 7", selfLevel: "A", resultTypes: ["软件系统", "算法模型"], deployForm: "本地", valueProposition: "面向电子制造订单波动大、交期短场景，基于需求预测与主计划 MPS 联动，解决计划与生产脱节。", techHighlights: ["需求预测与订单承诺", "主计划与 MPS 联动", "变更管理与可视化"], landingCaseCount: 3, typicalClient: "某消费电子代工", keyMetric: "交付周期缩短 25%", applyTime: "2024-06-28", industry: "电子" },
    { id: "p10", status: "专家评审", name: "集团供应链数字化规划与试点", belongUnit: "某集团供应链管理部", projectStage: "试点", trlLevel: "TRL 6", selfLevel: "B", resultTypes: ["技术方案", "软件系统", "平台产品"], deployForm: "混合", valueProposition: "面向多业态多系统集团场景，基于数字化战略与主数据试点，解决系统孤岛与业务 IT 目标不一致。", techHighlights: ["供应链数字化战略与路线图", "主数据与核心流程试点", "平台化与集成架构"], landingCaseCount: 2, typicalClient: "某多元化集团", keyMetric: "核心场景 5 个上线", applyTime: "2024-07-18", industry: "制造" },
  ];

  const INDUSTRIES = ["汽车", "快消", "电商", "医药", "制造", "零售", "电子", "食品"];

  function matchProject(p, q, industry) {
    const qLower = (q || "").trim().toLowerCase();
    if (qLower) {
      const inName = (p.name || "").toLowerCase().includes(qLower);
      const inUnit = (p.belongUnit || "").toLowerCase().includes(qLower);
      const inIndustry = (p.industry || "").toLowerCase().includes(qLower);
      const inTypes = (p.resultTypes || []).some(function (t) { return t.toLowerCase().includes(qLower); });
      const inProp = (p.valueProposition || "").toLowerCase().includes(qLower);
      const inHighlights = (p.techHighlights || []).some(function (h) { return h.toLowerCase().includes(qLower); });
      const inStatus = (p.status || "").toLowerCase().includes(qLower);
      if (!inName && !inUnit && !inIndustry && !inTypes && !inProp && !inHighlights && !inStatus) return false;
    }
    if (industry && p.industry !== industry) return false;
    return true;
  }

  function renderIndustryOptions(selectEl) {
    selectEl.innerHTML = '<option value="">全部行业</option>' +
      INDUSTRIES.map(function (i) { return '<option value="' + escapeHtml(i) + '">' + escapeHtml(i) + '</option>'; }).join("");
  }

  var BUILDING_ICON = '<svg class="project-card__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>';
  var TREND_ICON = '<svg class="project-card__metric-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
  var CALENDAR_ICON = '<svg class="project-card__date-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

  function renderProjects(list, container, countEl, stateEl) {
    if (list.length === 0) {
      stateEl.innerHTML = '<p class="projects-empty">暂无符合条件的项目，可尝试调整搜索或筛选条件。</p>';
      stateEl.classList.add("projects-state--visible");
      container.innerHTML = "";
    } else {
      stateEl.innerHTML = "";
      stateEl.classList.remove("projects-state--visible");
      container.innerHTML = list
        .map(function (p) {
          var statusSlug = (p.status || "").replace(/\s+/g, "");
          var statusClass = "project-card__status project-card__status--" + escapeHtml(statusSlug);
          var statusRow = p.status ? '<span class="' + statusClass + '" title="状态">' + escapeHtml(p.status) + '</span>' : "";

          var deployLabel = p.deployForm === "本地" ? "本地" : p.deployForm === "云" ? "云" : p.deployForm === "混合" ? "混合" : "";
          var deployRow = deployLabel ? '<span class="project-card__deploy" title="部署形态">' + escapeHtml(deployLabel) + '</span>' : "";

          var accentClass = "";
          if (p.status === "专家评审") accentClass = " project-card--accent-orange";
          else if (p.status === "待初审") accentClass = " project-card--accent-blue";

          var badges = [];
          if (p.trlLevel) badges.push('<span class="project-card__badge">' + escapeHtml(p.trlLevel) + '</span>');
          if (p.selfLevel) badges.push('<span class="project-card__badge">' + escapeHtml(p.selfLevel) + '</span>');
          if (p.projectStage) badges.push('<span class="project-card__badge">' + escapeHtml(p.projectStage) + '</span>');
          var badgeRow = badges.length ? '<div class="project-card__badges">' + badges.join("") + '</div>' : "";

          var resultTypes = (p.resultTypes || []).slice(0, 4);
          var solutionRow = resultTypes.map(function (t) {
            return '<span class="project-card__solution"><span class="project-card__solution-dot"></span>' + escapeHtml(t) + '</span>';
          }).join("");

          var valueProp = p.valueProposition ? '<p class="project-card__value">' + escapeHtml(p.valueProposition) + '</p>' : "";

          var hasCase = p.landingCaseCount != null && p.landingCaseCount !== "";
          var hasClient = !!p.typicalClient;
          var caseNum = hasCase ? String(p.landingCaseCount) : "";
          var statsTopHtml = "";
          if (hasCase || hasClient) {
            statsTopHtml =
              '<div class="project-card__stats-top">' +
              (hasCase ? '<div class="project-card__stat"><span class="project-card__stat-label">落地案例</span><span class="project-card__stat-value"><span class="project-card__stat-num">' + escapeHtml(caseNum) + '</span><span class="project-card__stat-unit">个</span></span></div>' : '') +
              (hasClient ? '<div class="project-card__stat"><span class="project-card__stat-label">典型客户</span><span class="project-card__stat-value">' + escapeHtml(p.typicalClient) + '</span></div>' : '') +
              '</div>';
          }
          var metricHtml = p.keyMetric ? '<div class="project-card__metric">' + TREND_ICON + '<span>' + escapeHtml(p.keyMetric) + '</span></div>' : "";
          var statsHtml = (statsTopHtml || metricHtml) ? '<div class="project-card__stats">' + statsTopHtml + (statsTopHtml && metricHtml ? '<div class="project-card__stats-sep"></div>' : '') + (metricHtml ? '<div class="project-card__stats-bottom">' + metricHtml + '</div>' : '') + '</div>' : "";

          var dateHtml = p.applyTime ? '<div class="project-card__date">' + CALENDAR_ICON + '<span>' + escapeHtml(p.applyTime) + '</span></div>' : "";
          var opsHtml = '<span class="project-card__ops"><a href="./project-detail.html?id=' + escapeHtml(p.id) + '">详情</a>';
          if (p.status === "待初审") {
            opsHtml += '<button type="button" class="project-card__btn project-card__btn--primary">开始初审</button>';
          } else if (p.status === "初审中") {
            opsHtml += '<button type="button" class="project-card__btn project-card__btn--primary">继续审核</button>';
          }
          opsHtml += '</span>';

          return (
            '<article class="project-card' + accentClass + '" role="listitem" data-id="' + escapeHtml(p.id) + '">' +
              '<div class="project-card__top">' +
                (statusRow ? '<div class="project-card__status-wrap">' + statusRow + '</div>' : '') +
                deployRow +
              '</div>' +
              '<h2 class="project-card__title">' + escapeHtml(p.name || "") + '</h2>' +
              '<p class="project-card__unit">' + BUILDING_ICON + '<span>' + escapeHtml(p.belongUnit || "") + '</span></p>' +
              badgeRow +
              valueProp +
              (solutionRow ? '<div class="project-card__solutions">' + solutionRow + '</div>' : '') +
              statsHtml +
              '<div class="project-card__footer">' +
                dateHtml +
                opsHtml +
              '</div>' +
            '</article>'
          );
        })
        .join("");
    }
    if (countEl) countEl.textContent = "共 " + list.length + " 个项目";
  }

  function init() {
    var searchInput = document.getElementById("projectSearch");
    var industrySelect = document.getElementById("projectIndustry");
    var gridEl = document.getElementById("projectGrid");
    var countEl = document.getElementById("projectResultCount");
    var stateEl = document.getElementById("projectState");

    renderIndustryOptions(industrySelect);

    function applyFilter() {
      var q = searchInput ? searchInput.value : "";
      var industry = industrySelect ? industrySelect.value : "";
      var filtered = PROJECTS.filter(function (p) { return matchProject(p, q, industry); });
      renderProjects(filtered, gridEl, countEl, stateEl);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilter);
    if (industrySelect) industrySelect.addEventListener("change", applyFilter);

    applyFilter();
  }

  init();
})();
