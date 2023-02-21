---
title: Accessibility Guidance Landing Page Test
summary: This is a test of implementing a selection process - ignore
author: hallen
date: 2023-02-20
toc: false
isGuide: true
---
<div class="selector">
<script>previousRole = ""; function showSectionRole(role) { document.getElementById(previousRole).className = "hidden-role"; document.getElementById(role).classList.remove("hidden-role"); previousRole = role;}</script>
<style>
.hidden-role {
visibility: hidden;
}
</style>
<p style="float: left; margin: 0px;">I am an&nbsp;</p><select onchange="showSectionRole(this.value)" name="role" id="role" style="float: left; margin: 0px; width: 200px; padding: 0px;"><option value="" disabled selected hidden>choose role</option><option value="teacher">educator / teacher</option><option value="it-admin">IT administrator</option><option value="web-dev">website developer</option><option value="sen-coordinator">special needs coordinator / head of accessibility</option><option value="school-administrator">school administrator / senior leadership</option></select><p style="float: left; margin: 0px;">&nbsp;and I am interested in making my school / college more accessible.</p>
</div>
<br><br>
<div class="role-section-container">
<div class="hidden-role" id="">

</div>
<div class="hidden-role" id="teacher">
You have selected the role of teacher.
</div>
<div class="hidden-role" id="it-admin">
You have selected the role of IT admin
</div>
<div class="hidden-role" id="web-dev">

</div>
<div class="hidden-role" id="sen-coordinator">

</div>
<div class="hidden-role" id="school-administrator">

</div>
</div>
