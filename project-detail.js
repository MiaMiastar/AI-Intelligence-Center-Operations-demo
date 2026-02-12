(function () {
  function escapeHtml(str) {
    if (str == null) return "";
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  var PROJECTS = [
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

  function getProjectId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id") || "";
  }

  function setText(el, text) {
    if (!el) return;
    el.textContent = text == null || text === "" ? "—" : String(text);
  }

  function setHtml(el, html) {
    if (!el) return;
    el.innerHTML = html == null ? "" : html;
  }

  function renderDetail(p) {
    var titleEl = document.getElementById("detailTitle");
    var subtitleEl = document.getElementById("detailSubtitle");
    if (titleEl) titleEl.textContent = p.name || "项目详情";
    if (subtitleEl) subtitleEl.textContent = "查看项目完整信息与审核状态";

    setText(document.getElementById("detailName"), p.name);
    setText(document.getElementById("detailBelongUnit"), p.belongUnit);
    setText(document.getElementById("detailIndustry"), p.industry);
    setText(document.getElementById("detailProjectStage"), p.projectStage);
    setText(document.getElementById("detailTrlLevel"), p.trlLevel);
    setText(document.getElementById("detailSelfLevel"), p.selfLevel);
    setText(document.getElementById("detailDeployForm"), p.deployForm);
    setText(document.getElementById("detailApplyTime"), p.applyTime);
    setText(document.getElementById("detailValueProposition"), p.valueProposition);
    setText(document.getElementById("detailTypicalClient"), p.typicalClient);
    setText(document.getElementById("detailKeyMetric"), p.keyMetric);

    var landingEl = document.getElementById("detailLandingCaseCount");
    if (landingEl) {
      if (p.landingCaseCount != null && p.landingCaseCount !== "") {
        landingEl.textContent = p.landingCaseCount + " 个";
      } else {
        landingEl.textContent = "—";
      }
    }

    var statusEl = document.getElementById("detailStatus");
    if (statusEl) {
      var statusSlug = (p.status || "").replace(/\s+/g, "");
      statusEl.className = "detail-value detail-status detail-status--" + escapeHtml(statusSlug);
      statusEl.textContent = p.status || "—";
    }

    var typesEl = document.getElementById("detailResultTypes");
    if (typesEl) {
      var types = p.resultTypes || [];
      typesEl.innerHTML = types.length
        ? types.map(function (t) { return '<span class="detail-tag">' + escapeHtml(t) + '</span>'; }).join("")
        : '<span class="detail-value">—</span>';
    }

    var highlightsEl = document.getElementById("detailTechHighlights");
    if (highlightsEl) {
      var highlights = p.techHighlights || [];
      highlightsEl.innerHTML = highlights.length
        ? highlights.map(function (h) { return '<li>' + escapeHtml(h) + '</li>'; }).join("")
        : '<li class="detail-empty-item">—</li>';
    }

    var btnFirst = document.getElementById("btnFirstReview");
    var btnContinue = document.getElementById("btnContinueReview");
    if (btnFirst) btnFirst.style.display = p.status === "待初审" ? "inline-flex" : "none";
    if (btnContinue) btnContinue.style.display = p.status === "初审中" ? "inline-flex" : "none";

    if (btnFirst && p.status === "待初审") {
      btnFirst.addEventListener("click", function () {
        alert("开始初审（功能待对接审核流程）");
      });
    }
    if (btnContinue && p.status === "初审中") {
      btnContinue.addEventListener("click", function () {
        alert("继续审核（功能待对接审核流程）");
      });
    }
  }

  function init() {
    var id = getProjectId();
    var detailCard = document.getElementById("detailCard");
    var detailEmpty = document.getElementById("detailEmpty");

    if (!id) {
      if (detailCard) detailCard.style.display = "none";
      if (detailEmpty) {
        detailEmpty.style.display = "block";
      }
      return;
    }

    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) {
      if (detailCard) detailCard.style.display = "none";
      if (detailEmpty) detailEmpty.style.display = "block";
      return;
    }

    if (detailEmpty) detailEmpty.style.display = "none";
    if (detailCard) detailCard.style.display = "block";
    renderDetail(project);
  }

  init();
})();
