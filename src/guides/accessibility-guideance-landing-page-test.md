---
title: Accessibility Guidance Landing Page Test
summary: This is a test of implementing a selection process - ignore
author: hallen
date: 2023-02-20
toc: false
isGuide: true
---
<div class="selector">
<script>
previousRole = "";

function showSectionRole(role) {
document.getElementById(previousRole).className = "hiddenRole";
document.getElementById(role).classList.remove("hiddenRole");
previousRole = role;
}
</script>
<p style="float: left; margin: 0px;">I am an&nbsp;</p><select onchange="showSectionRole(this.value)" name="role" id="role" style="float: left; margin: 0px; width: 200px; padding: 0px;"><option value="" disabled selected hidden>choose role</option><option value="teacher">educator / teacher</option><option value="it-admin">IT administrator</option><option value="web-dev">website developer</option><option value="sen-coordinator">special needs coordinator / head of accessibility</option><option value="school-administrator">school administrator / senior leadership</option></select><p style="float: left; margin: 0px;">&nbsp;and I am interested in making my school / college more accessible.</p>
</div>
