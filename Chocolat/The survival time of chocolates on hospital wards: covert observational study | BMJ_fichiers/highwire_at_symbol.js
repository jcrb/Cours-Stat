/**
 * Highwire at Symbol
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */

$(document).ready(function(){
  $('.highwire-markup .em-addr').each(function() {
    var replaced = $(this).html().replace('\{at\}','@');
    var replaced = "<a href='mailto:" + replaced + "'>" + replaced + "</a>";
    $(this).html(replaced);
  });
});
