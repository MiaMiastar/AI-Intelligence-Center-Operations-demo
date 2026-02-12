(function () {
  'use strict';

  var DOMAIN_SECONDARY = {
    '供应链管理': ['战略规划', '执行落地', '绩效评估', '供应链金融'],
    '采购与寻源': ['供应商管理', '采购策略', '寻源', '品类管理'],
    '计划与预测': ['需求预测', 'S&OP', '库存优化', '主计划'],
    '仓储物流': ['仓储规划', '运输管理', '配送', '最后一公里'],
    '数字化': ['系统实施', '数据中台', '流程自动化', 'IoT'],
    '其他': ['其他']
  };

  var form = document.getElementById('expertForm');
  var avatarInput = document.getElementById('avatar');
  var avatarPreview = document.getElementById('avatarPreview');
  var bioShortEl = document.getElementById('bioShort');
  var bioLongEl = document.getElementById('bioLong');
  var bioShortCount = document.getElementById('bioShortCount');
  var bioLongCount = document.getElementById('bioLongCount');
  var domainPrimary = document.getElementById('domainPrimary');
  var domainSecondary = document.getElementById('domainSecondary');
  var tagsInput = document.getElementById('tagsInput');
  var tagsChips = document.getElementById('tagsChips');
  var tagsHidden = document.getElementById('tagsHidden');
  var tagsHint = document.getElementById('tagsHint');
  var priceFaceOnly = document.getElementById('priceFaceOnly');
  var priceInputs = document.getElementById('priceInputs');

  var tags = [];

  // ---------- 头像上传预览 ----------
  if (avatarInput && avatarPreview) {
    avatarPreview.addEventListener('click', function () { avatarInput.click(); });
    avatarInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      var reader = new FileReader();
      reader.onload = function () {
        avatarPreview.innerHTML = '<img src="' + reader.result + '" alt="头像预览" />';
        avatarPreview.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------- 简介字数统计 ----------
  function countChars(str) {
    return (str || '').replace(/\s/g, '').length;
  }

  function updateBioShortCount() {
    var n = countChars(bioShortEl.value);
    bioShortCount.textContent = n + ' / 50-120 字';
    if (n > 0 && (n < 50 || n > 120)) bioShortCount.classList.add('invalid'); else bioShortCount.classList.remove('invalid');
  }

  function updateBioLongCount() {
    var n = countChars(bioLongEl.value);
    bioLongCount.textContent = n + ' / 300-800 字';
    if (n > 0 && (n < 300 || n > 800)) bioLongCount.classList.add('invalid'); else bioLongCount.classList.remove('invalid');
  }

  if (bioShortEl) bioShortEl.addEventListener('input', updateBioShortCount);
  if (bioLongEl) bioLongEl.addEventListener('input', updateBioLongCount);

  // ---------- 领域二级联动 ----------
  if (domainPrimary && domainSecondary) {
    domainPrimary.addEventListener('change', function () {
      var primary = this.value;
      domainSecondary.innerHTML = '<option value="">二级领域</option>';
      if (primary && DOMAIN_SECONDARY[primary]) {
        DOMAIN_SECONDARY[primary].forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt;
          o.textContent = opt;
          domainSecondary.appendChild(o);
        });
      }
    });
  }

  // ---------- 标签 chips：回车添加，点击删除，3-10 个 ----------
  function syncTagsHidden() {
    if (tagsHidden) tagsHidden.value = tags.join(',');
    if (tagsHint) {
      tagsHint.textContent = tags.length + ' / 3-10 个';
      if (tags.length > 0 && (tags.length < 3 || tags.length > 10)) tagsHint.classList.add('invalid'); else tagsHint.classList.remove('invalid');
    }
  }

  function addTag(text) {
    var t = (text || '').trim();
    if (!t || tags.indexOf(t) >= 0 || tags.length >= 10) return;
    tags.push(t);
    var chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = t;
    chip.dataset.value = t;
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'chip-remove';
    close.setAttribute('aria-label', '删除');
    close.textContent = '×';
    close.addEventListener('click', function () {
      tags = tags.filter(function (v) { return v !== t; });
      chip.remove();
      syncTagsHidden();
    });
    chip.appendChild(close);
    tagsChips.appendChild(chip);
    syncTagsHidden();
  }

  if (tagsInput && tagsChips) {
    tagsInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag(this.value);
        this.value = '';
      }
    });
  }

  // ---------- 动态列表：单行（strengths, publications, certificates, awards） ----------
  function addSimpleRow(container, name) {
    var row = document.createElement('div');
    row.className = 'dynamic-row dynamic-row-single';
    row.dataset.name = name;
    var input = document.createElement('input');
    input.type = 'text';
    input.name = name + '[]';
    input.placeholder = '请输入';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-remove-row';
    btn.setAttribute('aria-label', '删除');
    btn.textContent = '×';
    btn.addEventListener('click', function () { row.remove(); });
    row.appendChild(input);
    row.appendChild(btn);
    container.appendChild(row);
  }

  function bindSimpleLists() {
    [
      { listId: 'strengthsList', name: 'strengths' },
      { listId: 'publicationsList', name: 'publications' },
      { listId: 'certificatesList', name: 'certificates' },
      { listId: 'awardsList', name: 'awards' }
    ].forEach(function (cfg) {
      var list = document.getElementById(cfg.listId);
      if (!list) return;
      var wrap = list.closest('.dynamic-list');
      var addBtn = wrap && wrap.querySelector('.btn-add-row');
      if (addBtn) {
        addBtn.addEventListener('click', function () { addSimpleRow(list, cfg.name); });
      }
      addSimpleRow(list, cfg.name);
    });
  }

  // ---------- 动态列表：块状（experiences, cases） ----------
  function bindBlockLists() {
    var tplExp = document.getElementById('tpl-experience');
    var tplCase = document.getElementById('tpl-case');
    var expList = document.getElementById('experiencesList');
    var caseList = document.getElementById('casesList');

    if (tplExp && expList) {
      var wrapExp = expList.closest('.dynamic-list');
      var addExp = wrapExp && wrapExp.querySelector('.btn-add-row');
      if (addExp) {
        addExp.addEventListener('click', function () {
          var fragment = tplExp.content.cloneNode(true);
          var rowEl = fragment.querySelector('.dynamic-row');
          var removeBtn = rowEl && rowEl.querySelector('.btn-remove-row');
          if (removeBtn) removeBtn.addEventListener('click', function () { rowEl.remove(); });
          expList.appendChild(fragment);
        });
      }
    }

    if (tplCase && caseList) {
      var wrapCase = caseList.closest('.dynamic-list');
      var addCase = wrapCase && wrapCase.querySelector('.btn-add-row');
      if (addCase) {
        addCase.addEventListener('click', function () {
          var fragment = tplCase.content.cloneNode(true);
          var rowEl = fragment.querySelector('.dynamic-row');
          var removeBtn = rowEl && rowEl.querySelector('.btn-remove-row');
          if (removeBtn) removeBtn.addEventListener('click', function () { rowEl.remove(); });
          caseList.appendChild(fragment);
        });
      }
    }
  }

  // ---------- 价格“面议”开关 ----------
  if (priceFaceOnly && priceInputs) {
    function togglePriceInputs() {
      priceInputs.style.display = priceFaceOnly.checked ? 'none' : 'flex';
      if (priceFaceOnly.checked) {
        document.getElementById('priceValue').value = '';
      }
    }
    priceFaceOnly.addEventListener('change', togglePriceInputs);
    togglePriceInputs();
  }

  // ---------- 表单校验与提交 ----------
  function validate() {
    var err = [];

    if (bioShortEl && (countChars(bioShortEl.value) < 50 || countChars(bioShortEl.value) > 120)) {
      err.push('简介短需 50-120 字');
    }
    if (bioLongEl && (countChars(bioLongEl.value) < 300 || countChars(bioLongEl.value) > 800)) {
      err.push('简介长需 300-800 字');
    }
    if (tags.length < 3 || tags.length > 10) {
      err.push('关键词标签需 3-10 个');
    }

    var serviceTypes = form.querySelectorAll('input[name="serviceTypes"]:checked');
    if (serviceTypes.length === 0) {
      err.push('请至少选择一项服务类型');
    }
    var industries = form.querySelectorAll('input[name="industries"]:checked');
    if (industries.length === 0) {
      err.push('请至少选择一项行业经验');
    }

    if (err.length) {
      alert(err.join('\n'));
      return false;
    }
    return true;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      // 此处可接入真实提交接口
      alert('专家信息已提交（演示）。实际项目中可在此调用接口保存。');
      window.location.href = './expert.html';
    });
  }

  // ---------- 仅保存（草稿，不校验、不跳转） ----------
  var btnSaveOnly = document.getElementById('btnSaveOnly');
  if (btnSaveOnly && form) {
    btnSaveOnly.addEventListener('click', function () {
      if (tagsHidden) tagsHidden.value = tags.join(',');
      // 此处可接入保存草稿接口，仅持久化数据，不提交审核
      alert('已保存（演示）。实际项目中可在此调用接口仅保存草稿。');
    });
  }

  // ---------- 初始化 ----------
  bindSimpleLists();
  bindBlockLists();
  syncTagsHidden();
})();
