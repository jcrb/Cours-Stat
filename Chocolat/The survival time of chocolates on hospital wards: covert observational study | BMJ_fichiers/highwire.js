/**
 * Uses AJAX to replace placeholder scopus and isi links with full information
 * 
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */

$('document').ready(function() {
  $('a.highwire-isi').each(function(id, value) {
    var apath = $(this).attr('data-apath');
    var hide = $(this).attr('data-hide');
    $.getJSON(Drupal.settings.basePath + "highwire/links/ajax/isi/"+id, {apath: apath}, function(json) {
      if(json.timescited > 0){
        $('a#highwire-isi-'+json.id).append(' (' + json.timescited + ')');
      } else {
        $('a#highwire-isi-'+json.id).replaceWith( '<span id="highwire-isi-hide-'+json.id+'">No '+$('a#highwire-isi-'+json.id).text()+'</span>');
        if(hide != 1){
          $('#highwire-isi-hide-'+json.id).parent().show();
        }
      }
      
      if(hide != 1){
        $('#highwire-isi-'+json.id).parent().show();
      }
      
      for (j in json.links) {
        if (json.links[j].type == 'citing' && json.links[j].url != '') {
          $('a#highwire-isi-'+json.id).attr('href',json.links[j].url);
          $('#highwire-isi-'+json.id).parent().css('display', 'block');
          break;
        } else {
          $('a#highwire-isi-'+json.id).replaceWith( '<span id="highwire-isi-hide-'+json.id+'">No '+$('a#highwire-isi-'+json.id).text()+'</span>'); 
        }
      }
    }); 
  });
  
  $('a.highwire-scopus').each(function(id, value) {
    var apath = $(this).attr('data-apath');
    var hide = $(this).attr('data-hide');
    $.getJSON(Drupal.settings.basePath + "highwire/links/ajax/scopus/"+id, {apath: apath}, function(json) {
      if(json.timescited){
        $('a#highwire-scopus-'+json.id).append(' (' + json.timescited + ')');
      } else {
        $('a#highwire-scopus-'+json.id).replaceWith( '<span id="highwire-scopus-hide-'+json.id+'">No '+$('a#highwire-scopus-'+json.id).text()+'</span>');
        
        if(hide != 1){
          $('#highwire-scopus-hide-'+json.id).parent().css('display', 'block');
        }
      }

      if(hide != 1){
        $('a#highwire-scopus-'+json.id).show();
      }

      for (j in json.links) {
        if (json.links[j].type == 'related' && json.links[j].url != '') {
           $('a#highwire-scopus-'+json.id).attr('href',json.links[j].url);
           $('#highwire-scopus-'+json.id).parent().css('display', 'block');
           break;
        } else {
          $('a#highwire-scopus-'+json.id).replaceWith( '<span id="highwire-scopus-hide-'+json.id+'">No '+$('a#highwire-scopus-'+json.id).text()+'</span>');
          
        }
        if(hide != 1){
          $('#highwire-scopus-hide-'+json.id).parent().css('display', 'block');
        }
      }
    });
  });
});

