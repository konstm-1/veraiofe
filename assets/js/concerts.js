/* Рендерит афишу концертов из единого источника данных
   (/assets/data/concerts-data.js) в оба #concerts-upcoming и
   #concerts-archive — используется и сайтом Веры Иофе, и сайтом трио,
   так что правка одного файла с данными обновляет обе афиши. */

(function () {
  function row(item, isPast) {
    var program = (item.program || []).join('<br>');
    return (
      '<div class="concert-row">' +
        '<div class="concert-date">' + item.day + '<span>' + item.year + '</span></div>' +
        '<div class="concert-details">' +
          '<h3>' + item.title + '</h3>' +
          '<p>' + item.venue + '</p>' +
          (program ? '<p>' + program + '</p>' : '') +
        '</div>' +
        '<span class="concert-tag' + (isPast ? ' concert-tag--past' : '') + '">' + (isPast ? 'Прошло' : 'Скоро') + '</span>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var data = window.CONCERTS_DATA;
    if (!data) return;

    var upcomingMount = document.getElementById('concerts-upcoming');
    var archiveMount = document.getElementById('concerts-archive');

    if (upcomingMount) upcomingMount.innerHTML = data.upcoming.map(function (item) { return row(item, false); }).join('');
    if (archiveMount) archiveMount.innerHTML = data.archive.map(function (item) { return row(item, true); }).join('');
  });
})();
