(function () {
  'use strict';

  var form = document.getElementById('courseForm');
  var coverInput = document.getElementById('cover');
  var coverPreview = document.getElementById('coverPreview');
  var courseVideoInput = document.getElementById('courseVideo');
  var courseVideoArea = document.getElementById('courseVideoArea');
  var courseDescEl = document.getElementById('courseDesc');
  var descCount = document.getElementById('descCount');
  var priceFree = document.getElementById('priceFree');
  var priceInputs = document.getElementById('priceInputs');
  var priceValue = document.getElementById('priceValue');

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

  // ---------- 课程视频上传 ----------
  if (courseVideoInput && courseVideoArea) {
    courseVideoArea.addEventListener('click', function () { courseVideoInput.click(); });
    courseVideoInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      if (!file.type.startsWith('video/')) {
        alert('请选择视频文件（如 mp4、webm）');
        return;
      }
      courseVideoArea.classList.add('has-video');
      var placeholder = courseVideoArea.querySelector('.video-upload-placeholder');
      if (placeholder) placeholder.textContent = '已选择：' + file.name;
    });
  }

  // ---------- 简介字数统计 ----------
  function countChars(str) {
    return (str || '').replace(/\s/g, '').length;
  }

  function updateDescCount() {
    var n = countChars(courseDescEl.value);
    if (descCount) descCount.textContent = n + ' / 200 字';
  }

  if (courseDescEl) courseDescEl.addEventListener('input', updateDescCount);

  // ---------- 免费/价格切换 ----------
  function togglePriceInputs() {
    if (!priceInputs || !priceValue) return;
    if (priceFree && priceFree.checked) {
      priceInputs.style.opacity = '0.5';
      priceInputs.style.pointerEvents = 'none';
      priceValue.removeAttribute('required');
      priceValue.value = '';
    } else {
      priceInputs.style.opacity = '1';
      priceInputs.style.pointerEvents = 'auto';
    }
  }

  if (priceFree) {
    priceFree.addEventListener('change', togglePriceInputs);
    togglePriceInputs();
  }

  // ---------- 保存逻辑（复用校验与收集） ----------
  function saveCourse(resetAfter) {
    var free = priceFree && priceFree.checked;
    if (!free && priceValue && (!priceValue.value || Number(priceValue.value) < 0)) {
      alert('请填写有效价格，或勾选「免费」');
      return;
    }
    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (v, k) {
      if (k === 'cover' && v instanceof File && v.size === 0) return;
      if (k === 'courseVideo' && v instanceof File && v.size === 0) return;
      if (k === 'priceValue' && free) return;
      data[k] = v;
    });
    console.log('课程保存数据:', data);
    alert('课程已保存（演示）');
    if (resetAfter) {
      form.reset();
      if (coverPreview) {
        coverPreview.innerHTML = '<span class="avatar-placeholder">上传封面</span>';
        coverPreview.classList.remove('has-image');
      }
      if (courseVideoArea) {
        courseVideoArea.classList.remove('has-video');
        var ph = courseVideoArea.querySelector('.video-upload-placeholder');
        if (ph) ph.textContent = '点击或拖拽上传课程视频';
      }
      if (courseVideoInput) courseVideoInput.value = '';
      updateDescCount();
      togglePriceInputs();
    }
  }

  // ---------- 仅保存按钮 ----------
  var btnSaveOnly = document.getElementById('btnSaveOnly');
  if (btnSaveOnly) {
    btnSaveOnly.addEventListener('click', function () {
      saveCourse(false);
    });
  }

  // ---------- 表单提交 ----------
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      saveCourse(true);
    });
  }
})();
