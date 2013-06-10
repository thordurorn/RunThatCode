var rtcLangDDwn = '<select name="lang" id="lang">' +
    '<option value="-1" label="Select language"  title="Select language" >Select language</option>' +    
    '<option value="7" label="Ada"  title="Ada (gnat-4.6)" >Ada</option>' +
    '<option value="13" label="Assembler"  title="Assembler (nasm-2.10.01)" >Assembler</option>' +
    '<option value="45" label="Assembler"  title="Assembler (gcc-4.7.2)" >Assembler</option>' +
    '<option value="104" label="AWK (gawk)"  title="AWK (gawk) (gawk-3.1.6)" >AWK (gawk)</option>' +
    '<option value="105" label="AWK (mawk)"  title="AWK (mawk) (mawk-1.3.3)" >AWK (mawk)</option>' +
    '<option value="28" label="Bash"  title="Bash (bash 4.0.35)" >Bash</option>' +
    '<option value="110" label="bc"  title="bc (bc-1.06.95)" >bc</option>' +
    '<option value="12" label="Brainf**k"  title="Brainf**k (bff-1.0.3.1)" >Brainf**k</option>' +
    '<option value="11" label="C"  title="C (gcc-4.7.2)" >C</option>' +
    '<option value="27" label="C#"  title="C# (mono-2.8)" >C#</option>' +
    '<option value="41" label="C++ 4.3.2"  title="C++ 4.3.2 (gcc-4.3.2)" >C++ 4.3.2</option>' +
    '<option value="1" label="C++ 4.7.2"  title="C++ 4.7.2 (gcc-4.7.2)" >C++ 4.7.2</option>' +
    '<option value="44" label="C++11"  title="C++11 (gcc-4.7.2)" >C++11</option>' +
    '<option value="34" label="C99 strict"  title="C99 strict (gcc-4.7.2)" >C99 strict</option>' +
    '<option value="14" label="CLIPS"  title="CLIPS (clips 6.24)" >CLIPS</option>' +
    '<option value="111" label="Clojure"  title="Clojure (clojure 1.5.0-RC2)" >Clojure</option>' +
    '<option value="118" label="COBOL"  title="COBOL (open-cobol-1.0)" >COBOL</option>' +
    '<option value="106" label="COBOL 85"  title="COBOL 85 (tinycobol-0.65.9)" >COBOL 85</option>' +
    '<option value="32" label="Common Lisp (clisp)"  title="Common Lisp (clisp) (clisp 2.47)" >Common Lisp (clisp)</option>' +
    '<option value="102" label="D (dmd)"  title="D (dmd) (dmd-2.042)" >D (dmd)</option>' +
    '<option value="36" label="Erlang"  title="Erlang (erl-5.7.3)" >Erlang</option>' +
    '<option value="124" label="F#"  title="F# (fsharp-2.0.0)" >F#</option>' +
    '<option value="123" label="Factor"  title="Factor (factor-0.93)" >Factor</option>' +
    '<option value="125" label="Falcon"  title="Falcon (falcon-0.9.6.6)" >Falcon</option>' +
    '<option value="107" label="Forth"  title="Forth (gforth-0.7.0)" >Forth</option>' +
    '<option value="5" label="Fortran"  title="Fortran (gfortran-4.7.2)" >Fortran</option>' +
    '<option value="114" label="Go"  title="Go (1.0.3)" >Go</option>' +
    '<option value="121" label="Groovy"  title="Groovy (groovy-2.1.0-rc-1)" >Groovy</option>' +
    '<option value="21" label="Haskell"  title="Haskell (ghc-7.4.1)" >Haskell</option>' +
    '<option value="16" label="Icon"  title="Icon (iconc 9.4.3)" >Icon</option>' +
    '<option value="9" label="Intercal"  title="Intercal (c-intercal 28.0-r1)" >Intercal</option>' +
    '<option value="10" label="Java"  title="Java (sun-jdk-1.7.0_10)" >Java</option>' +
    '<option value="55" label="Java7"  title="Java7 (sun-jdk-1.7.0_10)" >Java7</option>' +
    '<option value="35" label="JavaScript (rhino)"  title="JavaScript (rhino) (rhino-1.7R4)" >JavaScript (rhino)</option>' +
    '<option value="112" label="JavaScript (spidermonkey)"  title="JavaScript (spidermonkey) (spidermonkey-1.7)" >JavaScript (spidermonkey)</option>' +
    '<option value="26" label="Lua"  title="Lua (luac 5.1.4)" >Lua</option>' +
    '<option value="30" label="Nemerle"  title="Nemerle (ncc 0.9.3)" >Nemerle</option>' +
    '<option value="25" label="Nice"  title="Nice (nicec 0.9.6)" >Nice</option>' +
    '<option value="122" label="Nimrod"  title="Nimrod (nimrod-0.8.8)" >Nimrod</option>' +
    '<option value="56" label="Node.js"  title="Node.js (0.8.11)" >Node.js</option>' +
    '<option value="43" label="Objective-C"  title="Objective-C (gcc-4.5.1)" >Objective-C</option>' +
    '<option value="8" label="Ocaml"  title="Ocaml (ocamlopt 3.10.2)" >Ocaml</option>' +
    '<option value="127" label="Octave"  title="Octave (3.6.2)" >Octave</option>' +
    '<option value="119" label="Oz"  title="Oz (mozart-1.4.0)" >Oz</option>' +
    '<option value="57" label="PARI/GP"  title="PARI/GP (2.5.1)" >PARI/GP</option>' +
    '<option value="22" label="Pascal (fpc)"  title="Pascal (fpc) (fpc 2.6.2)" >Pascal (fpc)</option>' +
    '<option value="2" label="Pascal (gpc)"  title="Pascal (gpc) (gpc 20070904)" >Pascal (gpc)</option>' +
    '<option value="3" label="Perl"  title="Perl (perl 5.16.2)" >Perl</option>' +
    '<option value="54" label="Perl 6"  title="Perl 6 (rakudo-2010.08)" >Perl 6</option>' +
    '<option value="29" label="PHP"  title="PHP (php 5.4.4)" >PHP</option>' +
    '<option value="19" label="Pike"  title="Pike (pike 7.6.86)" >Pike</option>' +
    '<option value="108" label="Prolog (gnu)"  title="Prolog (gnu) (gprolog-1.3.1)" >Prolog (gnu)</option>' +
    '<option value="15" label="Prolog (swi)"  title="Prolog (swi) (swipl 5.6.64)" >Prolog (swi)</option>' +
    '<option value="4" label="Python"  title="Python (python 2.7.3)" >Python</option>' +
    '<option value="116" label="Python 3"  title="Python 3 (python-3.2.3)" >Python 3</option>' +
    '<option value="117" label="R"  title="R (R-2.11.1)" >R</option>' +
    '<option value="17" label="Ruby"  title="Ruby (ruby-1.9.3)" >Ruby</option>' +
    '<option value="39" label="Scala"  title="Scala (scala-2.10.0)" >Scala</option>' +
    '<option value="33" label="Scheme (guile)"  title="Scheme (guile) (guile 1.8.5)" >Scheme (guile)</option>' +
    '<option value="23" label="Smalltalk"  title="Smalltalk (gst 3.1)" >Smalltalk</option>' +
    '<option value="40" label="SQL"  title="SQL (sqlite3-3.7.3)" >SQL</option>' +
    '<option value="38" label="Tcl"  title="Tcl (tclsh 8.5.7)" >Tcl</option>' +
    '<option value="62" label="Text"  title="Text (text 6.10)" >Text</option>' +
    '<option value="115" label="Unlambda"  title="Unlambda (unlambda-2.0.0)" >Unlambda</option>' +
    '<option value="101" label="VB.NET"  title="VB.NET (mono-2.4.2.3)" >VB.NET</option>' +
    '<option value="6" label="Whitespace"  title="Whitespace (wspace 0.3)" >Whitespace</option>' +
'</select>'