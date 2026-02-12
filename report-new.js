(function () {
  'use strict';

  var form = document.getElementById('reportForm');
  var coverInput = document.getElementById('cover');
  var coverPreview = document.getElementById('coverPreview');
  var reportFileInput = document.getElementById('reportFile');
  var reportFileArea = document.getElementById('reportFileArea');
  var reportAbstractEl = document.getElementById('reportAbstract');
  var abstractCount = document.getElementById('abstractCount');
  var tagsInput = document.getElementById('tagsInput');
  var tagsChips = document.getElementById('tagsChips');
  var tagsHidden = document.getElementById('tagsHidden');
  var tagsHint = document.getElementById('tagsHint');

  var tags = [];

  // ---------- 封面上传预览 ----------
  if (coverInput && coverPreview) {
    coverPreview.addEventListener('click', function () { coverInput.click(); });
    coverInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      var reader = new FileReader();
      reader.onload = function () {
        coverPreview.innerHTML = '<img src="' + reader.result + '" alt="封面预览" />';
        coverPreview.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------- 报告文件上传 ----------
  if (reportFileInput && reportFileArea) {
    reportFileArea.addEventListener('click', function () { reportFileInput.click(); });
    reportFileInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      var ext = (file.name || '').split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx'].indexOf(ext) === -1) {
        alert('请选择 PDF 或 Word 格式文件');
        return;
      }
      reportFileArea.classList.add('has-video');
      var placeholder = reportFileArea.querySelector('.video-upload-placeholder');
      if (placeholder) placeholder.textContent = '已选择：' + file.name;
    });
  }

  // ---------- 摘要字数统计 ----------
  function countChars(str) {
    return (str || '').replace(/\s/g, '').length;
  }

  function updateAbstractCount() {
    var n = countChars(reportAbstractEl.value);
    if (abstractCount) abstractCount.textContent = n + ' / 300 字';
  }

  if (reportAbstractEl) reportAbstractEl.addEventListener('input', updateAbstractCount);

  // ---------- 标签 chips：回车添加，点击删除 ----------
  function syncTagsHidden() {
    if (tagsHidden) tagsHidden.value = tags.join(',');
    if (tagsHint) tagsHint.textContent = tags.length + ' 个标签';
  }

  function addTag(text) {
    var t = (text || '').trim();
    if (!t || tags.indexOf(t) >= 0) return;
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
    if (tagsChips) tagsChips.appendChild(chip);
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

  // ---------- 仅保存（不跳转） ----------
  var btnSaveOnly = document.getElementById('btnSaveOnly');
  if (btnSaveOnly && form) {
    btnSaveOnly.addEventListener('click', function () {
      var reportFile = reportFileInput && reportFileInput.files[0];
      if (!reportFile || !reportFile.size) {
        alert('请上传报告文件（PDF 或 Word）');
        return;
      }
      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (v, k) {
        if (k === 'cover' && v instanceof File && v.size === 0) return;
        if (k === 'reportFile' && v instanceof File && v.size === 0) return;
        data[k] = v;
      });
      console.log('报告保存数据:', data);
      alert('已保存');
    });
  }

  // ---------- 表单提交 ----------
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var reportFile = reportFileInput && reportFileInput.files[0];
      if (!reportFile || !reportFile.size) {
        alert('请上传报告文件（PDF 或 Word）');
        return;
      }

      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (v, k) {
        if (k === 'cover' && v instanceof File && v.size === 0) return;
        if (k === 'reportFile' && v instanceof File && v.size === 0) return;
        data[k] = v;
      });

      console.log('报告提交数据:', data);
      alert('报告已保存（演示）');
      window.location.href = './report-manage.html';
    });
  }
})();
