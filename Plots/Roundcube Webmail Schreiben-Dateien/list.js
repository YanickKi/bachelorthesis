/**
 * Roundcube List Widget
 *
 * This file is part of the Roundcube Webmail client
 *
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this file.
 *
 * Copyright (c) The Roundcube Dev Team
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 * @author Thomas Bruederli <roundcube@gmail.com>
 * @author Charles McNulty <charles@charlesmcnulty.com>
 *
 * @requires jquery.js, common.js
 */
function rcube_list_widget(t,e){if(this.ENTER_KEY=13,this.DELETE_KEY=46,this.BACKSPACE_KEY=8,this.list=t||null,this.tagname=this.list?this.list.nodeName.toLowerCase():"table",this.id_regexp=/^rcmrow([a-z0-9\-_=\+\/]+)/i,this.rows={},this.selection=[],this.rowcount=0,this.colcount=0,this.subject_col=0,this.modkey=0,this.multiselect=!1,this.multiexpand=!1,this.multi_selecting=!1,this.draggable=!1,this.column_movable=!1,this.keyboard=!1,this.toggleselect=!1,this.aria_listbox=!1,this.parent_focus=!0,this.checkbox_selection=!1,this.drag_active=!1,this.col_drag_active=!1,this.column_fixed=null,this.last_selected=null,this.shift_start=null,this.focused=!1,this.drag_mouse_start=null,this.dblclick_time=500,this.row_init=function(){},this.touch_start_time=0,this.touch_event_time=500,e&&"object"==typeof e)for(var i in e)this[i]=e[i];rcube_list_widget._instances.push(this)}rcube_list_widget.prototype={init:function(){"table"==this.tagname&&this.list&&this.list.tBodies[0]?(this.thead=this.list.tHead,this.tbody=this.list.tBodies[0]):"table"!=this.tagname&&this.list&&(this.tbody=this.list),"listbox"==$(this.list).attr("role")&&(this.aria_listbox=!0,this.multiselect&&$(this.list).attr("aria-multiselectable","true"));var e=this;if(this.tbody){this.rows={},this.rowcount=0;for(var t=this.tbody.childNodes,i=0,s=t.length;i<s;i++)1==t[i].nodeType&&(this.rowcount+=this.init_row(t[i])?1:0);this.init_header(),this.frame=this.list.parentNode,this.keyboard&&(rcube_event.add_listener({event:"keydown",object:this,method:"key_press"}),$(this.list).attr("tabindex","0").on("focus",function(t){e.focus(t)}))}return this.parent_focus&&(this.list.parentNode.onclick=function(t){e.focus()}),rcmail.triggerEvent("initlist",{obj:this.list}),this},init_row:function(t){if(t.uid=this.get_row_uid(t),t&&t.uid){var e,i=this,s=t.uid;return this.rows[s]={uid:s,id:t.id,obj:t},$(t).data("uid",s).mousedown(function(t){return i.drag_row(t,this.uid)}).mouseup(function(t){return!(1==t.which&&!i.drag_active&&!$(t.currentTarget).is(".ui-droppable-active"))||i.click_row(t,this.uid)}),(bw.ie||bw.edge&&bw.vendver<75)&&bw.pointer?$(t).on("pointerdown",function(t){if("touch"==t.pointerType)return i.touch_start_time=(new Date).getTime(),!1}).on("pointerup",function(t){if("touch"==t.pointerType&&(new Date).getTime()-i.touch_start_time<=i.touch_event_time)return i.drag_row(t,this.uid),i.click_row(t,this.uid)}):bw.touch&&t.addEventListener&&(t.addEventListener("touchstart",function(t){1==t.touches.length&&(i.touchmoved=!1,i.drag_row(rcube_event.touchevent(t.touches[0]),this.uid),i.touch_start_time=(new Date).getTime())},!1),t.addEventListener("touchend",function(t){var e;1==t.changedTouches.length&&(e=(new Date).getTime()-i.touch_start_time,!i.touchmoved&&e<=i.touch_event_time&&!i.click_row(rcube_event.touchevent(t.changedTouches[0]),this.uid)&&t.preventDefault())},!1),t.addEventListener("touchmove",function(t){1==t.changedTouches.length&&(i.touchmoved=!0,i.drag_active&&t.preventDefault())},!1)),this.aria_listbox&&(e="l:"+t.id,$(t).attr("role","option").attr("aria-labelledby",e).find(this.col_tagname()).eq(this.subject_column()).attr("id",e)),document.all&&(t.onselectstart=function(){return!1}),this.row_init(this.rows[s]),this.triggerEvent("initrow",this.rows[s]),!0}},init_header:function(){if(this.thead){this.colcount=0,this.fixed_header?($(this.list.tHead).replaceWith($(this.fixed_header).find("thead").clone()),$(this.list.tHead).find("th,td").attr("style","").find("a").attr("tabindex","-1")):!bw.touch&&0<=this.list.className.indexOf("fixedheader")&&this.init_fixed_header();var t,e=this;if(this.column_movable&&this.thead&&this.thead.rows)for(t=0;t<this.thead.rows[0].cells.length;t++)this.column_fixed!=t&&(this.thead.rows[0].cells[t].onmousedown=function(t){return e.drag_column(t,this)},this.colcount++)}},container:window,init_fixed_header:function(){var e,t=$(this.list.tHead).clone();this.fixed_header?$(this.fixed_header).find("thead").replaceWith(t):(this.fixed_header=$("<table>").attr("id",this.list.id+"-fixedcopy").attr("class",this.list.className+" fixedcopy").attr("role","presentation").css({position:"fixed"}).append(t).append("<tbody></tbody>"),$(this.list).before(this.fixed_header),e=this,$(window).on("resize",function(){e.resize()}),$(this.container).on("scroll",function(){var t=$(this);e.fixed_header.css({marginLeft:-t.scrollLeft()+"px",marginTop:-t.scrollTop()+"px"})})),$(this.list.tHead).find("a.sortcol").attr("tabindex","-1"),t.find("a.sortcol").attr("tabindex","0"),this.thead=t.get(0),this.resize()},resize:function(){var e;this.fixed_header&&(e=[],$(this.tbody).parent().find("thead th,thead td").each(function(t){e[t]=$(this).width()}),$(this.thead).parent().width($(this.tbody).parent().width()),$(this.thead).find("th,td").each(function(t){$(this).width(e[t])}),$(window).scroll())},clear:function(t){var e;"table"==this.tagname?(e=document.createElement("tbody"),this.list.insertBefore(e,this.tbody),this.list.removeChild(this.list.tBodies[1]),this.tbody=e):$(this.row_tagname()+":not(.thead)",this.tbody).remove(),this.rows={},this.rowcount=0,this.last_selected=null,t&&this.clear_selection(),this.frame&&(this.frame.scrollTop=0),this.resize()},remove_row:function(t,e){var i=this,s=this.rows[t]?this.rows[t].obj:null;s&&(s.style.display="none",e&&this.select_next(t),delete this.rows[t],this.rowcount--,clearTimeout(this.resize_timeout),this.resize_timeout=setTimeout(function(){i.resize()},50))},insert_row:function(t,e){var i=this,s=this.tbody;if(void 0===t.nodeName){var o,r,n,h,c=document.createElement(this.row_tagname());for(t.id&&(c.id=t.id),t.uid&&(c.uid=t.uid),t.className&&(c.className=t.className),t.style&&$.extend(c.style,t.style),o=0;t.cols&&o<t.cols.length;o++){if(!(n=(h=t.cols[o]).dom))for(r in n=document.createElement(this.col_tagname()),h.className&&(n.className=h.className),h.innerHTML&&(n.innerHTML=h.innerHTML),h.events)n["on"+r]=h.events[r];c.appendChild(n)}t=c}this.checkbox_selection&&this.insert_checkbox(t),e&&s.childNodes.length?s.insertBefore(t,"object"==typeof e&&e.parentNode==s?e:s.firstChild):s.appendChild(t),this.init_row(t),this.rowcount++,clearTimeout(this.resize_timeout),this.resize_timeout=setTimeout(function(){i.resize()},50)},update_row:function(t,e,i,s){var o=this.rows[t];if(!o)return!1;for(var r=o.obj,n=0;e&&n<e.length;n++)this.get_cell(r,n).html(e[n]);i&&(delete this.rows[t],r.uid=i,r.id="rcmrow"+i,this.init_row(r),s&&(this.selection[0]=i),this.last_selected==t&&(this.last_selected=i))},insert_checkbox:function(e,t){var i,s=this,t=document.createElement(this.col_tagname(t)),o=document.createElement("input");o.type="checkbox",o.tabIndex=-1,o.onchange=function(t){s.select_row(e.uid,i||CONTROL_KEY,!0),t.stopPropagation(),i=null},o.onmousedown=function(t){i=rcube_event.get_modifier(t)},t.className="selection",t.onclick=function(t){$(t.target).is("input")||(i=rcube_event.get_modifier(t),$(o).prop("checked",!o.checked).change()),t.stopPropagation()},t.appendChild(o),e.insertBefore(t,e.firstChild)},enable_checkbox_selection:function(){this.checkbox_selection=!0;var t,e,i,s,o=this.row_tagname().toUpperCase();if(this.thead)for(t=0,e=(s=this.thead.childNodes).length;t<e;t++)if(s[t].nodeName==o&&(i=s[t].firstChild)){if("selection"==i.className)break;this.insert_checkbox(s[t],"thead")}for(t=0,e=(s=this.tbody.childNodes).length;t<e;t++)if(s[t].nodeName==o&&(i=s[t].firstChild)){if("selection"==i.className)break;this.insert_checkbox(s[t],"tbody")}},focus:function(t){this.focused||(this.focused=!0,t&&rcube_event.cancel(t),t=null,(t=this.last_selected&&this.rows[this.last_selected]?$(this.rows[this.last_selected].obj).find(this.col_tagname()).eq(this.subject_column()).attr("tabindex","0"):t)&&t.length?this.focus_noscroll(t):($("iframe,:focus:not(body)").blur(),window.focus()),$(this.list).addClass("focus").removeAttr("tabindex"),this.last_selected||this.select_first(CONTROL_KEY))},blur:function(t){this.focused=!1;var e=this;setTimeout(function(){$(e.list).attr("tabindex","0")},20),this.last_selected&&this.rows[this.last_selected]&&$(this.rows[this.last_selected].obj).find(this.col_tagname()).eq(this.subject_column()).removeAttr("tabindex"),$(this.list).removeClass("focus")},focus_noscroll:function(t){var e=this.frame.scrollTop||this.frame.scrollY;t.focus(),this.frame.scrollTop=e},hide_column:function(t,e){e=e?"addClass":"removeClass";this.fixed_header&&$(this.row_tagname()+" "+this.col_tagname()+"."+t,this.fixed_header)[e]("hidden"),$(this.row_tagname()+" "+this.col_tagname()+"."+t,this.list)[e]("hidden")},drag_column:function(t,e){if(1<this.colcount){this.drag_start=!0,this.drag_mouse_start=rcube_event.get_mouse_pos(t),rcube_event.add_listener({event:"mousemove",object:this,method:"column_drag_mouse_move"}),rcube_event.add_listener({event:"mouseup",object:this,method:"column_drag_mouse_up"}),this.add_dragfix();for(var i=0;i<this.thead.rows[0].cells.length;i++)if(e==this.thead.rows[0].cells[i]){this.selected_column=i;break}}return!1},drag_row:function(t,e){return!this.is_event_target(t)||(2==rcube_event.get_button(t)||(this.in_selection_before=!!(t&&t.istouch||this.in_selection(e))&&e,this.in_selection_before||(i=rcube_event.get_modifier(t),this.select_row(e,i,!0)),this.draggable&&this.selection.length&&this.in_selection(e)&&(this.drag_start=!0,this.drag_mouse_start=rcube_event.get_mouse_pos(t),rcube_event.add_listener({event:"mousemove",object:this,method:"drag_mouse_move"}),rcube_event.add_listener({event:"mouseup",object:this,method:"drag_mouse_up"}),bw.touch&&(rcube_event.add_listener({event:"touchmove",object:this,method:"drag_mouse_move"}),rcube_event.add_listener({event:"touchend",object:this,method:"drag_mouse_up"})),this.add_dragfix(),this.focus()),!1));var i},click_row:function(t,e){if(!e||!this.rows[e])return!1;if(!this.is_event_target(t))return!0;var i=(new Date).getTime(),s=i-this.rows[e].clicked<this.dblclick_time;return this.drag_active||s||this.in_selection_before!=e||this.select_row(e,rcube_event.get_modifier(t),!0),this.drag_start=!1,this.in_selection_before=!1,this.rowcount&&s&&this.in_selection(e)?(this.triggerEvent("dblclick"),i=0):this.triggerEvent("click"),this.drag_active||(this.del_dragfix(),rcube_event.cancel(t)),this.rows[e].clicked=i,this.focus(),!1},is_event_target:function(t){var e=rcube_event.get_target(t),t=e.tagName.toLowerCase();return!(e&&("input"==t||"img"==t||"a"!=t&&e.onclick||$(e).data("action-link")))},find_root:function(t){var e=this.rows[t];return e&&e.parent_uid?this.find_root(e.parent_uid):t},expand_row:function(t,e){e=this.rows[e],rcube_event.get_target(t),t=rcube_event.get_modifier(t),t=(e.expanded?"collapse":"expand")+(t==CONTROL_KEY||this.multiexpand?"_all":"");e.clicked=0,this[t](e)},collapse:function(t){var e,i=t.depth,s=t?t.obj.nextSibling:null;for(t.expanded=!1,this.update_expando(t.id),this.triggerEvent("expandcollapse",{uid:t.uid,expanded:t.expanded,obj:t.obj});s;){if(1==s.nodeType){if((e=this.rows[s.uid])&&e.depth<=i)break;$(s).css("display","none"),e.expanded&&(e.expanded=!1,this.triggerEvent("expandcollapse",{uid:e.uid,expanded:e.expanded,obj:s}))}s=s.nextSibling}return this.resize(),this.triggerEvent("listupdate"),!1},expand:function(t){var e,i,s,o,r;for(t?(t.expanded=!0,o=t.depth,s=t.obj.nextSibling,this.update_expando(t.id,!0),this.triggerEvent("expandcollapse",{uid:t.uid,expanded:t.expanded,obj:t.obj})):(s=this.tbody.firstChild,r=o=0);s;){if(1==s.nodeType&&(e=this.rows[s.uid])){if(t&&(!e.depth||e.depth<=o))break;if(e.parent_uid)if((i=this.rows[e.parent_uid])&&i.expanded)(t&&i==t||r>=i.depth-1)&&(r=i.depth,$(s).css("display",""),e.expanded=!0,this.update_expando(e.id,!0),this.triggerEvent("expandcollapse",{uid:e.uid,expanded:e.expanded,obj:s}));else if(t&&(!i||i.depth<=o))break}s=s.nextSibling}return this.resize(),this.triggerEvent("listupdate"),!1},collapse_all:function(t){var e,i,s;if(t){if(t.expanded=!1,e=t.depth,i=t.obj.nextSibling,this.update_expando(t.id),this.triggerEvent("expandcollapse",{uid:t.uid,expanded:t.expanded,obj:t.obj}),e&&this.multiexpand)return!1}else i=this.tbody.firstChild,e=0;for(;i;){if(1==i.nodeType&&(s=this.rows[i.uid])){if(t&&(!s.depth||s.depth<=e))break;(t||s.depth)&&$(i).css("display","none"),s.expanded&&(s.expanded=!1,s.has_children&&(this.update_expando(s.id),this.triggerEvent("expandcollapse",{uid:s.uid,expanded:s.expanded,obj:i})))}i=i.nextSibling}return this.resize(),this.triggerEvent("listupdate"),!1},expand_all:function(t){var e,i,s;for(t?(t.expanded=!0,e=t.depth,i=t.obj.nextSibling,this.update_expando(t.id,!0),this.triggerEvent("expandcollapse",{uid:t.uid,expanded:t.expanded,obj:t.obj})):(i=this.tbody.firstChild,e=0);i;){if(1==i.nodeType&&(s=this.rows[i.uid])){if(t&&s.depth<=e)break;$(i).css("display",""),s.expanded||(s.expanded=!0,s.has_children&&(this.update_expando(s.id,!0),this.triggerEvent("expandcollapse",{uid:s.uid,expanded:s.expanded,obj:i})))}i=i.nextSibling}return this.resize(),this.triggerEvent("listupdate"),!1},update_expando:function(t,e){t=document.getElementById("rcmexpando"+t);t&&(t.className=e?"expanded":"collapsed")},get_row_uid:function(t){var e;if(t)return t.uid||((e=$(t).data("uid"))?t.uid=e:String(t.id).match(this.id_regexp)&&(t.uid=RegExp.$1)),t.uid},get_next_row:function(t){if(!this.rowcount)return!1;for(var t=this.rows[t||this.last_selected],e=t?t.obj.nextSibling:null;e&&(1!=e.nodeType||"none"==e.style.display);)e=e.nextSibling;return e},get_prev_row:function(t){if(!this.rowcount)return!1;for(var t=this.rows[t||this.last_selected],e=t?t.obj.previousSibling:null;e&&(1!=e.nodeType||"none"==e.style.display);)e=e.previousSibling;return e},get_first_row:function(){if(this.rowcount)for(var t,e=this.tbody.childNodes,i=0;i<e.length;i++)if(e[i].id&&(t=this.get_row_uid(e[i]))&&this.rows[t])return t;return null},get_last_row:function(){if(this.rowcount)for(var t,e=this.tbody.childNodes,i=e.length-1;0<=i;i--)if(e[i].id&&(t=this.get_row_uid(e[i]))&&this.rows[t])return t;return null},get_next:function(){var t;if(t=this.get_next_row())return t.uid},get_prev:function(){var t;if(t=this.get_prev_row())return t.uid},row_tagname:function(){var t={table:"tr",ul:"li","*":"div"};return t[this.tagname]||t["*"]},col_tagname:function(t){var e={table:"td",thead:"th",tbody:"td","*":"span"};return e[t||this.tagname]||e["*"]},get_cell:function(t,e){return $(this.col_tagname(),t).eq(e+(this.checkbox_selection?1:0))},select_row:function(t,e,i){var s=this.selection.join(","),o=this.in_selection(t);if(!this.multiselect&&i&&(e=0),this.shift_start||(this.shift_start=t),e){switch(e){case SHIFT_KEY:this.shift_select(t,!1);break;case CONTROL_KEY:i&&(this.shift_start=t,this.highlight_row(t,!0));break;case CONTROL_SHIFT_KEY:this.shift_select(t,!0);break;default:this.highlight_row(t,!1)}this.multi_selecting=!0}else this.shift_start=t,this.highlight_row(t,!1),this.multi_selecting=!1;this.last_selected&&this.rows[this.last_selected]&&$(this.rows[this.last_selected].obj).removeClass("focused").find(this.col_tagname()).eq(this.subject_column()).removeAttr("tabindex"),this.toggleselect&&o&&!e?this.clear_selection():this.selection.join(",")!=s&&this.triggerEvent("select"),this.rows[t]&&($(this.rows[t].obj).addClass("focused"),this.focused&&this.focus_noscroll($(this.rows[t].obj).find(this.col_tagname()).eq(this.subject_column()).attr("tabindex","0"))),this.selection.length||(this.shift_start=null),this.last_selected=t},select:function(t){this.select_row(t,!1),this.scrollto(t)},select_next:function(t){t=this.get_next_row(t)||this.get_prev_row(t);t&&this.select_row(t.uid,!1,!1)},select_first:function(t,e){var i=this.get_first_row();i&&(this.select_row(i,t,!1),e||this.scrollto(i))},select_last:function(t,e){var i=this.get_last_row();i&&(this.select_row(i,t,!1),e||this.scrollto(i))},select_children:function(t){for(var e=this.row_children(t),i=e.length,s=0;s<i;s++)this.in_selection(e[s])||this.select_row(e[s],CONTROL_KEY,!0)},shift_select:function(t,e){this.rows[this.shift_start]&&this.selection.length||(this.shift_start=t);var i,s=this.rows[t],o=this._rowIndex(this.rows[this.shift_start].obj),r=this._rowIndex(s.obj),n=o<(r=o<r&&!s.expanded&&s.has_children&&(s=this.rows[this.row_children(t).pop()])?this._rowIndex(s.obj):r)?o:r,h=r<o?o:r;for(i in this.rows)this._rowIndex(this.rows[i].obj)>=n&&this._rowIndex(this.rows[i].obj)<=h?this.in_selection(i)||this.highlight_row(i,!0):this.in_selection(i)&&!e&&this.highlight_row(i,!0)},_rowIndex:function(t){return void 0!==t.rowIndex?t.rowIndex:$(t).prevAll().length},in_selection:function(t,e){for(var i in this.selection)if(this.selection[i]==t)return!e||parseInt(i);return!1},select_all:function(t){if(!this.rowcount)return!1;var e,i=this.selection.join(",");for(e in this.selection=[],this.rows)t&&1!=this.rows[e][t]?$(this.rows[e].obj).removeClass("selected").removeAttr("aria-selected"):(this.last_selected=e,this.highlight_row(e,!0,!0));return this.selection.join(",")!=i&&this.triggerEvent("select"),this.focus(),!0},invert_selection:function(){if(!this.rowcount)return!1;var t,e=this.selection.join(",");for(t in this.rows)this.highlight_row(t,!0);return this.selection.join(",")!=e&&this.triggerEvent("select"),this.focus(),!0},clear_selection:function(t,e){var i,s=this.selection.length;if(t){for(i in this.selection)if(this.selection[i]==t){this.selection.splice(i,1);break}}else{for(i in this.selection)this.rows[this.selection[i]]&&$(this.rows[this.selection[i]].obj).removeClass("selected").removeAttr("aria-selected");this.selection=[]}this.checkbox_selection&&$(this.row_tagname()+":not(.selected) > .selection > input:checked",this.list).prop("checked",!1),!s||this.selection.length||e||(this.triggerEvent("select"),this.last_selected=null)},get_selection:function(t){var e=$.merge([],this.selection),i={deep:t,res:e};if(!1===this.triggerEvent("getselection",i))return i.res;if(!1!==t&&e.length)for(var s,o=0,r=e.length;o<r;o++)if(s=e[o],this.rows[s]&&this.rows[s].has_children&&!this.rows[s].expanded)for(var n,h=0,c=(n=this.row_children(s)).length;h<c;h++)s=n[h],this.in_selection(s)||e.push(s);return e},get_single_selection:function(){var t=this.get_selection(!1);return 1==t.length?t[0]:null},highlight_row:function(t,e,i){var s;this.rows[t]&&(e?!1===(s=this.in_selection(t,!0))?(this.selection.push(t),$(this.rows[t].obj).addClass("selected").attr("aria-selected","true"),this.checkbox_selection&&$(".selection > input",this.rows[t].obj).prop("checked",!0),i||this.rows[t].expanded||this.highlight_children(t,!0)):(e=this.selection.slice(0,s),s=this.selection.slice(s+1,this.selection.length),this.selection=e.concat(s),$(this.rows[t].obj).removeClass("selected").removeAttr("aria-selected"),this.checkbox_selection&&$(".selection > input",this.rows[t].obj).prop("checked",!1),i||this.rows[t].expanded||this.highlight_children(t,!1)):(1<this.selection.length||!this.in_selection(t))&&(this.clear_selection(null,!0),this.selection[0]=t,$(this.rows[t].obj).addClass("selected").attr("aria-selected","true"),this.checkbox_selection&&$(".selection > input",this.rows[t].obj).prop("checked",!0)))},highlight_children:function(t,e){for(var i,s=this.row_children(t),o=s.length,r=0;r<o;r++)i=this.in_selection(s[r]),(e&&!i||!e&&i)&&this.highlight_row(s[r],!0,!0)},key_press:function(t){if(!this.focused||$(t.target).is("input,textarea,select"))return!0;var e=rcube_event.get_keycode(t),i=rcube_event.get_modifier(t);switch(e){case 37:case 39:case 40:case 38:case 63233:case 63232:return rcube_event.cancel(t),this.use_arrow_key(e,i);case 32:return rcube_event.cancel(t),this.select_row(this.last_selected,i,!0);case 36:return this.select_first(i),rcube_event.cancel(t);case 35:return this.select_last(i),rcube_event.cancel(t);case 65:if(i==CONTROL_KEY&&this.multiselect)return this.select_first(null,!0),this.select_last(SHIFT_KEY,!0),rcube_event.cancel(t);break;case 27:return this.drag_active?this.drag_mouse_up(t):this.col_drag_active?(this.selected_column=null,this.column_drag_mouse_up(t)):rcube_event.cancel(t);case 9:this.blur();break;case 13:this.selection.length||this.select_row(this.last_selected,i,!1);default:if(this.key_pressed=e,this.modkey=i,this.triggerEvent("keypress"),this.modkey=0,this.key_pressed==this.BACKSPACE_KEY)return rcube_event.cancel(t)}return!0},use_arrow_key:function(t,e){var i,s=this.rows[this.last_selected];return s?40==t||63233==t?i=this.get_next_row():38==t||63232==t?i=this.get_prev_row():39==t&&s.has_children?s.expanded?(i=this.get_next_row(),e=null):this.expand_all(s):37==t&&(!s.expanded||!s.has_children||s.parent_uid&&this.multiexpand?s.parent_uid&&(i=e==CONTROL_KEY?this.rows[this.find_root(s.uid)]:this.rows[s.parent_uid],e=null):this.collapse_all(s)):this.select_first(CONTROL_KEY),i&&(e||this.selection.length||(e=CONTROL_KEY),this.select_row(i.uid,e,!1),this.scrollto(i.uid)),!1},scrollto:function(t){var e,i,s=this.rows[t]?this.rows[t].obj:null;s&&this.frame&&(i=0,!(e=Number(s.offsetTop))&&this.rows[t].parent_uid&&(t=this.find_root(this.rows[t].uid),this.expand_all(this.rows[t]),e=Number(s.offsetTop)),this.fixed_header&&(i=Number(this.thead.offsetHeight)),e<Number(this.frame.scrollTop)+i?this.frame.scrollTop=e-i:e+Number(s.offsetHeight)>Number(this.frame.scrollTop)+Number(this.frame.offsetHeight)&&(this.frame.scrollTop=e+Number(s.offsetHeight)-Number(this.frame.offsetHeight)))},drag_mouse_move:function(t){if("touchmove"==t.type){if(1!=t.touches.length||1!=t.changedTouches.length)return rcube_event.cancel(t);t=rcube_event.touchevent(t.changedTouches[0])}if(this.drag_start){var e=rcube_event.get_mouse_pos(t),i=[],s=this;if(!this.drag_mouse_start||Math.abs(e.x-this.drag_mouse_start.x)<3&&Math.abs(e.y-this.drag_mouse_start.y)<3)return!1;this.drag_start_pos={left:e.x,top:e.y},this.draglayer?this.draglayer.html(""):this.draglayer=$("<div>").attr("id","rcmdraglayer").css({position:"absolute",display:"none","z-index":2e3}).appendTo(document.body),$(this.row_tagname()+".selected",this.tbody).each(function(){var t=s.get_row_uid(this),e=s.rows[t];if(e&&!(-1<$.inArray(t,i)))return i.push(t),e.has_children&&!e.expanded&&$.each(s.row_children(t),function(){-1<$.inArray(this,i)||i.push(this)}),!(11<i.length)&&void 0});function o(t){return t&&(t=$(t).clone(),$(t).find(".skip-on-drag").remove()),t?t.text():""}var r,n,h=s.subject_column();$.each(i,function(t,e){return 10<t?(s.draglayer.append($("<div>").text("...")),!1):(r=s.rows[e].obj,n="",$(r).children(s.col_tagname()).each(function(t,e){if((h<0||0<=h&&h==t)&&(n=o(e)))return!1}),void((n=!n.length?o($(r).children(".subject").first()):n).length&&(n=50<(n=n.trim()).length?n.substring(0,50)+"...":n,s.draglayer.append($("<div>").text(n)))))}),this.draglayer.show(),this.drag_active=!0,this.triggerEvent("dragstart")}return this.drag_active&&this.draglayer&&(e=rcube_event.get_mouse_pos(t),this.draglayer.css({left:e.x+20+"px",top:e.y-5+(bw.ie?document.documentElement.scrollTop:0)+"px"}),this.triggerEvent("dragmove",t||window.event)),this.drag_start=!1},drag_mouse_up:function(t){return document.onmousemove=null,"touchend"==t.type&&1!=t.changedTouches.length||(this.draglayer&&this.draglayer.is(":visible")&&(this.drag_start_pos?this.draglayer.animate(this.drag_start_pos,300,"swing").hide(20):this.draglayer.hide()),this.drag_active&&this.focus(),this.drag_active=!1,rcube_event.remove_listener({event:"mousemove",object:this,method:"drag_mouse_move"}),rcube_event.remove_listener({event:"mouseup",object:this,method:"drag_mouse_up"}),bw.touch&&(rcube_event.remove_listener({event:"touchmove",object:this,method:"drag_mouse_move"}),rcube_event.remove_listener({event:"touchend",object:this,method:"drag_mouse_up"})),this.del_dragfix(),this.triggerEvent("dragend",t)),rcube_event.cancel(t)},column_drag_mouse_move:function(t){if(this.drag_start){var e=rcube_event.get_mouse_pos(t);if(!this.drag_mouse_start||Math.abs(e.x-this.drag_mouse_start.x)<3&&Math.abs(e.y-this.drag_mouse_start.y)<3)return!1;if(!this.col_draglayer){var e=$(this.list).offset(),i=this.thead.rows[0].cells;for(e.top+=this.list.scrollTop+this.list.parentNode.scrollTop,this.col_draglayer=$("<div>").attr("id","rcmcoldraglayer").css(e).css({position:"absolute","z-index":2001,"background-color":"white",opacity:.75,height:this.frame.offsetHeight-2+"px",width:this.frame.offsetWidth-2+"px"}).appendTo(document.body).append($("<div>").attr("id","rcmcolumnindicator").css({position:"absolute","border-right":"2px dotted #555","z-index":2002,height:this.frame.offsetHeight-2+"px"})),this.cols=[],this.list_pos=this.list_min_pos=e.left,s=0;s<i.length;s++)this.cols[s]=i[s].offsetWidth,null!==this.column_fixed&&s<=this.column_fixed&&(this.list_min_pos+=this.cols[s])}this.col_draglayer.show(),this.col_drag_active=!0,this.triggerEvent("column_dragstart")}if(this.col_drag_active&&this.col_draglayer){var s,o=0,r=rcube_event.get_mouse_pos(t);for(s=0;s<this.cols.length&&r.x>=this.cols[s]/2+this.list_pos+o;s++)o+=this.cols[s];0==s&&this.list_min_pos>r.x?o=this.list_min_pos-this.list_pos:this.list.rowcount||s!=this.cols.length||(o-=2),$("#rcmcolumnindicator").css({width:o+"px"}),this.triggerEvent("column_dragmove",t||window.event)}return this.drag_start=!1},column_drag_mouse_up:function(t){if(document.onmousemove=null,this.col_draglayer&&(this.col_draglayer.remove(),this.col_draglayer=null),rcube_event.remove_listener({event:"mousemove",object:this,method:"column_drag_mouse_move"}),rcube_event.remove_listener({event:"mouseup",object:this,method:"column_drag_mouse_up"}),this.del_dragfix(),this.col_drag_active&&(this.col_drag_active=!1,this.focus(),this.triggerEvent("column_dragend",t),null!==this.selected_column&&this.cols&&this.cols.length)){for(var e=0,i=rcube_event.get_mouse_pos(t),s=0;s<this.cols.length&&i.x>=this.cols[s]/2+this.list_pos+e;s++)e+=this.cols[s];s!=this.selected_column&&s!=this.selected_column+1&&this.column_replace(this.selected_column,s)}return rcube_event.cancel(t)},row_children:function(t){if(!this.rows[t]||!this.rows[t].has_children)return[];for(var e=[],i=this.rows[t].depth,s=this.rows[t].obj.nextSibling;s;){if(1==s.nodeType&&(r=this.rows[s.uid])){if(!r.depth||r.depth<=i)break;e.push(r.uid)}s=s.nextSibling}return e},add_dragfix:function(){$("iframe").each(function(){$('<div class="iframe-dragdrop-fix"></div>').css({background:"#fff",width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css($(this).offset()).appendTo(document.body)})},del_dragfix:function(){$("div.iframe-dragdrop-fix").remove()},column_replace:function(t,e){if(this.thead&&this.thead.rows){var i,s=this.thead.rows[0].cells,o=s[t],n=s[e],h=document.createElement("td");for(n?s[0].parentNode.insertBefore(h,n):s[0].parentNode.appendChild(h),s[0].parentNode.replaceChild(o,h),r=0,i=this.tbody.rows.length;r<i;r++)row=this.tbody.rows[r],o=row.cells[t],n=row.cells[e],h=document.createElement("td"),n?row.insertBefore(h,n):row.appendChild(h),row.replaceChild(o,h);this.subject_col==t?this.subject_col=t<e?e-1:e:this.subject_col<t&&e<=this.subject_col?this.subject_col++:this.subject_col>t&&e>=this.subject_col&&this.subject_col--,this.fixed_header&&this.init_header(),this.triggerEvent("column_replace")}},subject_column:function(){return this.subject_col+(this.checkbox_selection?1:0)}},rcube_list_widget.prototype.addEventListener=rcube_event_engine.prototype.addEventListener,rcube_list_widget.prototype.removeEventListener=rcube_event_engine.prototype.removeEventListener,rcube_list_widget.prototype.triggerEvent=rcube_event_engine.prototype.triggerEvent,rcube_list_widget._instances=[];
