/**
 * Lyrics fallback data
 * --------------------
 * Plain (un-timed) lyrics for the lyrics hero, keyed by song title.
 *
 * Used by js/lyrics-hero.js ONLY when a song has no WebVTT timing file in
 * /songs (or the VTT fails to load). In that case the lyrics still display —
 * grouped into stanzas — but without the word-by-word karaoke highlight.
 * When a matching `songs/<n>. <Title>.vtt` exists, the VTT wins and the entry
 * here is ignored.
 *
 * Shape:  title -> array of stanzas -> array of line strings
 * Add a song by adding a key whose name matches its title in js/lyrics-hero.js.
 */

window.LYRICS_FALLBACK = {
  'Forest Fire': [
    [
      "Oh my darling, you took all that I am",
      "The world outside is so inconceivable",
      "You took me where I stand",
      "Oh the morning, see the clouds,",
      "They come in tow",
      "The tide painted a tired seascape",
      "Waiting for the blow"
    ],
    [
      "But I was never alone",
      "I was never low",
      "And so the feeling grows",
      "The feeling grows"
    ],
    [
      "See the tide",
      "See it shift to and fro",
      "I'm all strung out searching",
      "For answers that I will never know",
      "So why were you a forest fire",
      "Burning all that I had ever desired?",
      "And why were you so quiet?",
      "It was only in your silence",
      "That I saw bone"
    ],
    [
      "But I was never alone",
      "I was never low",
      "And so the feeling grows",
      "The feeling grows"
    ],
    [
      "You burnt me to the ground",
      "I see that now",
      "Looking back I see just how",
      "Pain has made me better"
    ]
  ],

  'Good Woman': [
    [
      "He took her like a dagger to the eye",
      "I watched it all",
      "I watched it all",
      "It's hard to watch a good woman cry",
      "I think about it",
      "I think about how",
      "Her body breaks",
      "Her body takes time",
      "Her body is not yours baby",
      "It's not mine"
    ],
    [
      "I watch her remember the reasons why",
      "How she tries",
      "How she tries",
      "It's hard to what a good woman cry",
      "I think about it",
      "I think about how",
      "Her body breaks",
      "Her body takes time",
      "Her body is not yours baby",
      "It's not mine"
    ]
  ],

  'Higher Ground': [
    [
      "I write love songs in the morning",
      "I write love songs in the day",
      "I'll sing to you tomorrow",
      "If I make it through today",
      "I've been holding out for you baby",
      "My arms a solid arc",
      "Tell me you don't believe it",
      "Life's gone and fucked me up",
      "So I'll say it loud",
      "You bring me to higher ground"
    ],
    [
      "See my mother in the kitchen",
      "Her daughter by the door",
      "And you, baby, were in the backcountry",
      "Our baby on the floor",
      "I'm a thousand different women",
      "Dressed in shades of red",
      "We won't win this race we're in",
      "just like I always said",
      "But love, you know just how",
      "To bring me to higher ground",
      "But love, you know just how",
      "To bring me to higher ground"
    ],
    [
      "I sing love songs in the morning",
      "I sing love songs in the day",
      "I sing love songs on the subway, baby",
      "Just to tell you I'm okay",
      "Oh I'll sing it loud",
      "You bring me to higher ground"
    ]
  ],

  'Saintly': [
    [
      "I am a heroine going slowly",
      "I am a hundred years of war",
      "I am Henry the eighth of England",
      "with his back against the wall"
    ],
    [
      "I feel saintly in my bedroom",
      "Your breath against my throat",
      "I feel saintly in the supermarket",
      "Slinging back a coke"
    ],
    [
      "You must think about me sometimes",
      "Do you think of me at all?",
      "I am not your saint here",
      "I never chose to fall"
    ],
    [
      "Joan of Arc came after the show",
      "Wearing neon, holding a microphone",
      "Said: I am not a statue, I will never be a stone"
    ],
    [
      "I feel saintly in my bedroom",
      "Her breath against my throat",
      "I feel saintly on the battlefield,",
      "Dancing across her moat"
    ],
    [
      "You must think about me sometimes",
      "Do you think of me at all?",
      "I am not your saint here",
      "I never chose to fall"
    ],
    [
      "I am nothing wrong",
      "I'm just sick of being someone else's song"
    ]
  ],

  'Nothing to Lose': [
    [
      "Should I care more than I do?",
      "I am nihilistic lately, just like you",
      "Should I care more than I do?",
      "I am apathetic maybe I'm feeling blue"
    ],
    [
      "Oh I'm in love with all the wrong things",
      "I cry more than I should",
      "So I took a little pill and hey",
      "I sort of felt like I would",
      "Just float away aha",
      "Just float away aha"
    ],
    [
      "Should I try less than I do?",
      "Someone once told me lately it's all I ever do",
      "Should I cry less than I do?",
      "Someone once told me maybe this is all I'll ever amount to"
    ],
    [
      "But I am like a knife",
      "Like a french movie with subtitles",
      "I am like a jackhammer",
      "With nothing to lose",
      "Nothing to lose aha",
      "Nothing to lose aha",
      "Nothing lose aha"
    ],
    [
      "But I am kind sometimes",
      "I dance on high tables",
      "I feel in all the right ways",
      "Now that I am older",
      "I say it like it is"
    ]
  ],

  'The Plane': [
    [
      "The plane flies away",
      "big white body",
      "last night was great",
      "was a fever",
      "but I don't know how far to go"
    ],
    [
      "Sometimes I drive",
      "to the movies",
      "just to watch somebody else's life",
      "I sit all alone in the darkness",
      "sometimes I laugh, sometimes I cry",
      "but I don't know how far to go"
    ],
    [
      "The thing is",
      "I'm happier than I've ever been",
      "but my friend is dying",
      "and water is still water",
      "didn't I know?",
      "didn't I know that this is how far we'd go?"
    ]
  ]
};
