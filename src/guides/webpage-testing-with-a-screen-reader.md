---
title: Webpage Testing with a Screen Reader
summary: How to perform basic web testing with a Screen Reader.
author: Anonymous
date: 2022-10-21
toc: false
tags:
  - JAWS
  - NVDA
  - Screen Reader
isGuide: true
---
<!--\[if !mso]>
<style>
v\:* {behavior:url(#default#VML);}
o\:* {behavior:url(#default#VML);}
w\:* {behavior:url(#default#VML);}
.shape {behavior:url(#default#VML);}
</style>
<!\[endif]-->

<!--\[if gte mso 9]><xml>
 <o:OfficeDocumentSettings>
  <o:AllowPNG/>
 </o:OfficeDocumentSettings>
</xml><!\[endif]-->

<!--\[if gte mso 9]><xml>
 <w:WordDocument>
  <w:View>Normal</w:View>
  <w:Zoom>0</w:Zoom>
  <w:TrackMoves>false</w:TrackMoves>
  <w:TrackFormatting/>
  <w:PunctuationKerning/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
  <w:DoNotPromoteQF/>
  <w:LidThemeOther>EN-GB</w:LidThemeOther>
  <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:EnableOpenTypeKerning/>
   <w:DontFlipMirrorIndents/>
   <w:OverrideTableStyleHps/>
  </w:Compatibility>
  <m:mathPr>
   <m:mathFont m:val="Cambria Math"/>
   <m:brkBin m:val="before"/>
   <m:brkBinSub m:val="&#45;-"/>
   <m:smallFrac m:val="off"/>
   <m:dispDef/>
   <m:lMargin m:val="0"/>
   <m:rMargin m:val="0"/>
   <m:defJc m:val="centerGroup"/>
   <m:wrapIndent m:val="1440"/>
   <m:intLim m:val="subSup"/>
   <m:naryLim m:val="undOvr"/>
  </m:mathPr></w:WordDocument>
</xml><!\[endif]-->

<!--\[if gte mso 9]><xml>
 <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false"
  DefSemiHidden="false" DefQFormat="false" DefPriority="99"
  LatentStyleCount="376">
  <w:LsdException Locked="false" Priority="0" QFormat="true" Name="Normal"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 1"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 2"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 3"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 4"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 5"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 6"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 7"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 8"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 9"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 9"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 1"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 2"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 3"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 4"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 5"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 6"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 7"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 8"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 9"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footnote text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="header"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footer"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index heading"/>
  <w:LsdException Locked="false" Priority="35" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="caption"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="table of figures"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="envelope address"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="envelope return"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footnote reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="line number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="page number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="endnote reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="endnote text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="table of authorities"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="macro"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="toa heading"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 5"/>
  <w:LsdException Locked="false" Priority="10" QFormat="true" Name="Title"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Closing"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Signature"/>
  <w:LsdException Locked="false" Priority="1" SemiHidden="true"
   UnhideWhenUsed="true" Name="Default Paragraph Font"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Message Header"/>
  <w:LsdException Locked="false" Priority="11" QFormat="true" Name="Subtitle"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Salutation"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Date"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text First Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text First Indent 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Note Heading"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Block Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Hyperlink"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="FollowedHyperlink"/>
  <w:LsdException Locked="false" Priority="22" QFormat="true" Name="Strong"/>
  <w:LsdException Locked="false" Priority="20" QFormat="true" Name="Emphasis"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Document Map"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Plain Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="E-mail Signature"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Top of Form"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Bottom of Form"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal (Web)"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Acronym"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Address"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Cite"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Code"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Definition"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Keyboard"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Preformatted"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Sample"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Typewriter"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Variable"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal Table"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation subject"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="No List"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Contemporary"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Elegant"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Professional"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Subtle 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Subtle 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Balloon Text"/>
  <w:LsdException Locked="false" Priority="39" Name="Table Grid"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Theme"/>
  <w:LsdException Locked="false" SemiHidden="true" Name="Placeholder Text"/>
  <w:LsdException Locked="false" Priority="1" QFormat="true" Name="No Spacing"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 1"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 1"/>
  <w:LsdException Locked="false" SemiHidden="true" Name="Revision"/>
  <w:LsdException Locked="false" Priority="34" QFormat="true"
   Name="List Paragraph"/>
  <w:LsdException Locked="false" Priority="29" QFormat="true" Name="Quote"/>
  <w:LsdException Locked="false" Priority="30" QFormat="true"
   Name="Intense Quote"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 1"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 1"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 2"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 2"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 2"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 3"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 3"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 3"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 4"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 4"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 4"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 5"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 5"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 5"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 6"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 6"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 6"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="19" QFormat="true"
   Name="Subtle Emphasis"/>
  <w:LsdException Locked="false" Priority="21" QFormat="true"
   Name="Intense Emphasis"/>
  <w:LsdException Locked="false" Priority="31" QFormat="true"
   Name="Subtle Reference"/>
  <w:LsdException Locked="false" Priority="32" QFormat="true"
   Name="Intense Reference"/>
  <w:LsdException Locked="false" Priority="33" QFormat="true" Name="Book Title"/>
  <w:LsdException Locked="false" Priority="37" SemiHidden="true"
   UnhideWhenUsed="true" Name="Bibliography"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="TOC Heading"/>
  <w:LsdException Locked="false" Priority="41" Name="Plain Table 1"/>
  <w:LsdException Locked="false" Priority="42" Name="Plain Table 2"/>
  <w:LsdException Locked="false" Priority="43" Name="Plain Table 3"/>
  <w:LsdException Locked="false" Priority="44" Name="Plain Table 4"/>
  <w:LsdException Locked="false" Priority="45" Name="Plain Table 5"/>
  <w:LsdException Locked="false" Priority="40" Name="Grid Table Light"/>
  <w:LsdException Locked="false" Priority="46" Name="Grid Table 1 Light"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark"/>
  <w:LsdException Locked="false" Priority="51" Name="Grid Table 6 Colorful"/>
  <w:LsdException Locked="false" Priority="52" Name="Grid Table 7 Colorful"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 1"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 1"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 1"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 2"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 2"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 2"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 3"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 3"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 3"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 4"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 4"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 4"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 5"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 5"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 5"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 6"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 6"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 6"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="46" Name="List Table 1 Light"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark"/>
  <w:LsdException Locked="false" Priority="51" Name="List Table 6 Colorful"/>
  <w:LsdException Locked="false" Priority="52" Name="List Table 7 Colorful"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 1"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 1"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 1"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 2"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 2"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 2"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 3"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 3"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 3"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 4"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 4"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 4"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 5"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 5"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 5"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 6"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 6"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 6"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Mention"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Smart Hyperlink"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Hashtag"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Unresolved Mention"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Smart Link"/>
 </w:LatentStyles>
</xml><!\[endif]-->

<!--\[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:"Table Normal";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:"";
	mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
	mso-para-margin-top:0cm;
	mso-para-margin-right:0cm;
	mso-para-margin-bottom:8.0pt;
	mso-para-margin-left:0cm;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;
	mso-fareast-language:EN-US;}
</style>
<!\[endif]-->

<!--\[if gte mso 9]><xml>
 <o:shapedefaults v:ext="edit" spidmax="1028"/>
</xml><!\[endif]-->

<!--\[if gte mso 9]><xml>
 <o:shapelayout v:ext="edit">
  <o:idmap v:ext="edit" data="1"/>
 </o:shapelayout></xml><!\[endif]-->

<!--StartFragment-->

Testing with Screen Readers \[Web pages]

 

When it comes to web accessibility, people with sight loss who use screen readers to complete online tasks is often the thing that people think of. This is where gaps appear. How do screen readers really work? Are they all the same? And why should you conduct screen reader testing on your website?

# What are screen readers?

Screen readers are specialist text-to-speech software that can be used by people with varying degrees of sight loss to access website content, generally these applications are used on a computer or mobile device. They are designed to run on up-to-date operating systems, like Windows, iOS and Android. The content screen readers work with include but are not limited to emails, word processing, spread sheets, web pages and many other applications.

 

Screen readers work by announcing site content such as headings, links, non-link text, images and more; they do this via an installed speech synthesizer.

 

Along with speech output, some screen reader applications allow the user to enhance the visual aspect of content altering the appearance of a web page. An example of this is the user increasing the size of the whole screen, changing mouse pointers, or adapting the screen colour. These changes are helpful for users who have limited vision or even users with colour blindness.

 

Many severely sight impaired users cannot accurately navigate web content with a mouse, so they will typically control their screen reader using only keyboard commands. This enables them to use a computer to perform the same tasks as a sighted user, but not all screen readers are the same. As with most technologies, there are several options to choose from. These can be either paid-for or free. Some come built-in to the user’s device, such as the software that runs on the Android or iOS platforms.

 

Popular computer screen reader software includes:

 

Free: NVDA, Windows Narrator, VoiceOver (macOS/iOS).

 

Paid-for: JAWS \[Job Access With Speech], Dolphin SuperNova.

 

 

 



 

# Screen reader Setup – at first logon

Please Note: It is advisable to enable Focus visual cues to allow sighted users to see where the software is whilst on a webpage. This is recommended as screen readers use an invisible cursor to move around any webpage. To enable this feature if it is not already on, please see below.

## JAWS

Focus mode is already turned on in JAWS, on a webpage you will see the red box around the focal point as demonstrated below.

<!--\[if gte vml 1]><v:rect id="Rectangle_x0020_4" o:spid="_x0000_s1027"
 style='position:absolute;margin-left:1.5pt;margin-top:21.7pt;width:102.75pt;
 height:23.1pt;z-index:251659264;visibility:visible;mso-wrap-style:square;
 mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;mso-wrap-distance-right:9pt;
 mso-wrap-distance-bottom:0;mso-position-horizontal:absolute;
 mso-position-horizontal-relative:text;mso-position-vertical:absolute;
 mso-position-vertical-relative:text;v-text-anchor:middle' o:gfxdata="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
EW62EtoyusETIXwGZ9GpqBdR47K+XitdaqmnTKHXg9Aq1Wjd/pAWV/U18M3nBhqbmYLG3knbb9Ya
EDIjlLT9CQyN4TJKIHaE+uZCNIDjlpHk6Qt/lcyScCG3kAhTg+ukk2aDiEjMPUqitq+2X7iBxjqH
aN2qq5AQPlrl1iCtfGzKgdNtJ+PJBI+k6XaDoiyd3kKGT3OF86lmvzpYcbIpuLsfjk+8IZ3yhwhC
rNGqKgOOiYCzg2pqzTGBw7AikZXxN1eYsrRrnkbpGErpiCYhyiqKmcxTuE7lhTr6rrCBcZftGQxq
mCQrhMNAFVjTqFY1LapGqsPSqns+k7KckTTLmmllFVU13VnMWiEvA3O2vFqRN7TKTQw5zazwaeqe
T7lrea6b6xOKKgEGL+znqLoXKAiGauVilmpK48U0rHJ2RrVrR77Bc1S7SJEwsn4zFztnt6JGOJcD
4pUqP/DNRy2QJnlfqS3tOtjeQ4k3DKptHw6XYTj4DK7geNoH2qqirSoaXMGZM5SL9KC47WcXOQWe
p5QCU8sptRxTzyn1nNLIKY2c0swpTd/TJ6pwiq8OU30vPzCFGpYdsGa9hX36v/EvAAAA//8DAFBL
AwQUAAYACAAAACEAnGZGQbsAAAAkAQAAKgAAAGNsaXBib2FyZC9kcmF3aW5ncy9fcmVscy9kcmF3
aW5nMS54bWwucmVsc4SPzQrCMBCE74LvEPZu0noQkSa9iNCr1AcIyTYtNj8kUezbG+hFQfCyMLPs
N7NN+7IzeWJMk3ccaloBQae8npzhcOsvuyOQlKXTcvYOOSyYoBXbTXPFWeZylMYpJFIoLnEYcw4n
xpIa0cpEfUBXNoOPVuYio2FBqrs0yPZVdWDxkwHii0k6zSF2ugbSL6Ek/2f7YZgUnr16WHT5RwTL
pRcWoIwGMwdKV2edNS1dgYmGff0m3gAAAP//AwBQSwECLQAUAAYACAAAACEAu+VIlAUBAAAeAgAA
EwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCtMD/x
wQAAADIBAAALAAAAAAAAAAAAAAAAADYBAABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQDheDVT
xAIAAGkGAAAfAAAAAAAAAAAAAAAAACACAABjbGlwYm9hcmQvZHJhd2luZ3MvZHJhd2luZzEueG1s
UEsBAi0AFAAGAAgAAAAhAJJ9h+AdBwAASSAAABoAAAAAAAAAAAAAAAAAIQUAAGNsaXBib2FyZC90
aGVtZS90aGVtZTEueG1sUEsBAi0AFAAGAAgAAAAhAJxmRkG7AAAAJAEAACoAAAAAAAAAAAAAAAAA
dgwAAGNsaXBib2FyZC9kcmF3aW5ncy9fcmVscy9kcmF3aW5nMS54bWwucmVsc1BLBQYAAAAABQAF
AGcBAAB5DQAAAAA=
" filled="f" strokecolor="red" strokeweight="2pt"/><!\[endif]--><!--\[if !vml]-->![](file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image001.png)<!--\[endif]--><!--\[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="Picture_x0020_3" o:spid="_x0000_i1026" type="#_x0000_t75"
 alt="This is an example of what the highlight option looks like in JAWS."
 style='width:145.5pt;height:96pt;visibility:visible;mso-wrap-style:square'
 o:bordertopcolor="yellow pure" o:borderleftcolor="yellow pure"
 o:borderbottomcolor="yellow pure" o:borderrightcolor="yellow pure">
 <v:imagedata src="file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image002.png"
  o:title="This is an example of what the highlight option looks like in JAWS"/>
 <w:bordertop type="single" width="8"/>
 <w:borderleft type="single" width="8"/>
 <w:borderbottom type="single" width="8"/>
 <w:borderright type="single" width="8"/>
</v:shape><!\[endif]--><!--\[if !vml]-->![This is an example of what the highlight option looks like in JAWS.](file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image003.jpg)<!--\[endif]-->

## Narrator

Focus mode is already turned on in Narrator. When the application starts you should see a coloured box like in the below image.

<!--\[if gte vml 1]><v:shape id="Picture_x0020_2" o:spid="_x0000_s1026"
 type="#_x0000_t75" alt="This is an example of what the highlight option looks like in Narrator."
 style='position:absolute;margin-left:0;margin-top:0;width:142.25pt;height:94.45pt;
 z-index:251658240;visibility:visible;mso-wrap-style:square;
 mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;mso-wrap-distance-right:9pt;
 mso-wrap-distance-bottom:0;mso-position-horizontal:left;
 mso-position-horizontal-relative:text;mso-position-vertical:top;
 mso-position-vertical-relative:text' stroked="t" strokecolor="black \[3213]"
 strokeweight="1pt">
 <v:imagedata src="file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image004.png"
  o:title="This is an example of what the highlight option looks like in Narrator"/>
 <w:wrap type="square"/>
</v:shape><!\[endif]--><!--\[if !vml]-->![This is an example of what the highlight option looks like in Narrator.](file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image005.jpg)<!--\[endif]-->

### NVDA

The Focus highlighting option within NVDA is not enabled to start with and needs to be turned on. To do this please do the following.

<!--\[if !supportLists]-->·         <!--\[endif]-->Press windows key plus B to go to the system tray

<!--\[if !supportLists]-->·         <!--\[endif]-->Locate NVDA with left or right arrow and press the application key when on it \[or right mouse click]

<!--\[if !supportLists]-->·         <!--\[endif]-->Go to preferences, then Settings and press enter.

<!--\[if !supportLists]-->·         <!--\[endif]-->Arrow down to Vision, then press tab until you get to Enable Highlighting, and press spacebar to select the option.

<!--\[if !supportLists]-->·         <!--\[endif]-->Tab to the OK button and press enter.

<!--\[if gte vml 1]><v:shape
 id="Picture_x0020_1" o:spid="_x0000_i1025" type="#_x0000_t75" alt="Image of the Settings area in NVDA where you can change the highlight options."
 style='width:188.25pt;height:125.25pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image006.png"
  o:title="Image of the Settings area in NVDA where you can change the highlight options"
  cropbottom="16289f" cropright="21070f"/>
</v:shape><!\[endif]--><!--\[if !vml]-->![Image of the Settings area in NVDA where you can change the highlight options.](file:///C:/Users/ccaepat/AppData/Local/Packages/oice_16_974fa576_32c1d314_e58/AC/Temp/msohtmlclip1/01/clip_image007.jpg)<!--\[endif]-->

# Testing using specific keystrokes

# Links information

With all screen readers you can move through links in various ways. Some SR allow you to move directly on the live page from one to the other, but also allow the user to list links to move and digest the information.

JAWS,                    JAWS Key + F7 – This is a specific to only show Links.

Narrator,             InsertCaps Lock + F7 Opens a dialogue selection.

NVDA,                  NVDA Key + F7 Opens a dialogue selection.

# Headings information

JAWS,                    JAWS Key + F6 – This is a specific to only show Headings.

Narrator,             Insert or Caps Lock + F6 Opens a dialogue selection. Select headings.

NVDA,                  NVDA Key + F7 Opens a dialogue selection. Select headings.

# Form Fields

This option includes all form elements with JAWS, or you can choose which element you want to look at with Narrator and NVDA.

 

JAWS,                    JAWS Key + F5 – This is a specific to only show Form elements.

Narrator,             Insert or Caps Lock + F7 Opens a dialogue selection. Select From fields.

NVDA,                  NVDA Key + F7 Opens a dialogue selection. Select Form fields.

 

## Graphics

JAWS,                   JAWS key + control + G to list or just press G or shift G.

Narrator,             Not available.

NVDA,                  Press the letter G or shift G to go backwards.

 

## Region \[Landmark]

JAWS:                   Move to main region press INSERT, Q. No list option for main region.

                                List regions press INSERT, control and R.

Narrator:             Caps Lock + F7 – select Landmarks

NVDA:                  Caps Lock + F7 – Select Landmarks

 

### Regions explained

Most web pages have an overall structure that is consistent with other web pages. For example, they tend to have a banner with branding and other high-level content, one or more lists of links for navigation within the website, a section where the main content resides, and a footer. Many pages also have a sidebar with complementary content, and a section of the page dedicated to search. All users benefit from a consistent, predictable page structure as it helps them to easily find content that typically can be found within these page regions.

 

For sighted users, page regions can easily be located by visual cues. They are typically positioned in predictable places, and often have a background colour or border that differentiates them from surrounding content.

Screen reader users need to understand the page structure just like everyone else.  If page regions are coded properly, screen reader users can understand the overall structure of the page and can easily jump directly to a specific page region. There are two methods for coding web pages in a way that explicitly identifies these common page regions. Both are described on the Techniques page, linked in the following section.

 

[Example of webpage construction with explanations of different areas](https://www.markbrinker.com/parts-of-a-website)

All the Screen Reading products use the same or similar quick keystrokes when using the internet. If you do not want to list all the elements as above, you can move directly to an area by pressing the correct lettered key. Please see a list of quick keystrokes as below.

 

# JAWS Internet Keystrokes

Navigation Quick Keys

Tip: If you press and hold SHIFT before pressing one of the following Navigation Quick Keys, you can move to the previous instance of that element, for example, press A to move to the next radio button, press SHIFT+A to move to the previous radio button.

 

In addition, if you press and hold CTRL+INSERT while pressing keystrokes with an asterisk (*) next to them, JAWS displays a list of those elements on the page.

 

Description                                                                         Keystroke

Next Radio Button                                                           A*

Next Button                                                                       B*

Next Combo Box, List Box, or Tree View                 C*

Next Different Element                                                 D

Next Edit Box                                                                     E*

Next Form Control                                                           F

Next Graphic                                                                      G*

Next Heading                                                                     H

Next Item in a List                                                            I

Jump to Line                                                                       J*

Next PlaceMarker                                                            K*

Next List                                                                               L*

Next Frame                                                                        M

Skip Past Links                                                                   N

Next Article                                                                        O*

Next Paragraph                                                                 P*

Move to Main Region                                                     Q

Next Region                                                                       R*

Next Same Element                                                        S

Next Table                                                                          T*

Next Unvisited Link                                                         U

Next Visited Link                                                               V

Next Check Box                                                                 X*

Next Division                                                                      Z*

Next Tab Control                                                              APOSTROPHE*

Next Separator                                                                 DASH

Next Clickable Element                                                  SLASH*

Next Mouse Over Element                                           SEMICOLON*

Next Element                                                                    SHIFT+PERIOD

Previous Element                                                             SHIFT+COMMA

# NVDA – Internet Single Letter Navigation Full keystroke list

The following keys by themselves jump to the next available element, while adding the shift key causes them to jump to the previous element:

 

h: heading

l: list

i: list item

t: table

k: link

n: nonlinked text

f: form field

u: unvisited link

v: visited link

e: edit field

b: button

x: checkbox

c: combo box

r: radio button

q: block quote

s: separator

m: frame

g: graphic

d: landmark

o: embedded object (audio and video player, application, dialog, etc.)

1 to 6: headings at levels 1 to 6 respectively

a: annotation (comment, editor revision, etc.)

w: spelling error

 

## Narrator Internet Keystrokes

E Next edit box

R Next Radio Button

T Next Table

I Next List Item

D Next region or Landmark

F Next Form field

H Next Heading

K Next link

X Next checkbox

C Next combo box

B Next button

# Full keystroke list.

NVDA: [Full NVDA Keystroke list](file:///C:/Program%20Files%20(x86)/NVDA/documentation/en/keyCommands.html)

JAWS: [Full JAWS Keystroke list](https://www.freedomscientific.com/training/jaws/hotkeys/)

Narrator: [Narrator help Page and keystroke list](https://compass-ssl.microsoft.com/assets/bc/11/bc11e21a-2b99-4292-9f21-7564bec25f30.pdf?n=Complete-guide-to-Narrator_2004.pdf)

<!--EndFragment-->