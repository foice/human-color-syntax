define(function (require, exports, module) {
    var CodeMirror          = brackets.getModule("thirdparty/CodeMirror/lib/codemirror"),
        LanguageManager     = brackets.getModule("language/LanguageManager");
    
    CodeMirror.defineSimpleMode("human", {
    start: [
      { regex: /#.*/,   /*push: "comment",*/ token: "comment" },
      { regex: /\*NEW/,    push: "human", token: "tag" },
        { regex: /\*NEWPROC/,    push: "human", token: "tag" },
        { regex: /\*CUT/,    push: "human", token: "tag" },
         { regex: /\*PROC/,    push: "human", token: "tag" },
      { regex: /\*BEGIN/,    push: "human", token: "tag" }
    ],
    human: [
      { regex: /#.*/,  /* push: "comment",*/ token: "comment" },
     // { regex: /#/,  token: "comment" },
        
      { regex: /\*END/, pop: true, token: "tag" },

      // Double and single quotes
      { regex: /"(?:[^\\]|\\.)*?"/, token: "string" },
      { regex: /'(?:[^\\]|\\.)*?'/, token: "string" },

      // human keywords
        { regex: /maxstatus/, token: "keyword" },
        { regex: /lumi/, token: "keyword" },
        { regex: /minstatus/, token: "keyword" },
        { regex: /nbegin/, token: "keyword" },
        { regex: /nmaxev/, token: "keyword" },
        { regex: /printevery/, token: "keyword" },
        { regex: /printpassedevery/, token: "keyword" },
                { regex: /pTofn/, token: "keyword" },
                { regex: /NumberOfJets/, token: "keyword" },
                { regex: /deltaR/, token: "keyword" },
        { regex: /scale|type|bg|sum|components|diff|normalized|mcut|algorithm/, token: "keyword" },
    

      // Numeral
      { regex: /\d+/i, token: "number" },

      // Atoms like = and .
      { regex: /=|~|@|true|false|events|lin|fb|!/, token: "atom" },

      // Paths
      { regex: /(?:\.\.\/)*(?:[A-Za-z_][\w\.]*)+/, token: "variable-2" }
    ],
//    dash_comment: [
//      { regex: /--\}\}/, pop: true, token: "comment" },
      // Commented code
//      { regex: /./, token: "comment"}
 //   ],
    comment: [
       
     // { regex: /.$/, pop: true, token: "comment" }
     // ,  { regex: /abc(?!$)/, token: "comment" } 

    ]
  });

  CodeMirror.defineMIME("text/x-human-template", "human");
    
 LanguageManager.defineLanguage("human", {
        name: "human",
        mode: ["human", "text/x-human-template"],
        fileExtensions: ["human"],
        blockComment: ["#region\n", "\n#endregion"],
        lineComment: ["#"] 
    });
    
});