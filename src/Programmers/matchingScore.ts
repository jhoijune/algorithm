import {} from 'module';

const solution = (word: string, pages: string[]): number => {
  /**
   * 매칭 점수
   */
  const siteMap = new Map<string, number>();
  const scores: {
    basicScore: number;
    linkLen: number;
    linkScore: number;
  }[] = [];
  const size = pages.length;
  const externalLinkRe = /<a .*?href="(.*?)"/g;
  const siteRe = /<meta property="og:url" content="(.*?)"/;
  for (let index = 0; index < size; index++) {
    const score: { basicScore: number; linkLen: number; linkScore: number } = {
      basicScore: 0,
      linkLen: 0,
      linkScore: 0,
    };
    const page = pages[index].toLowerCase();
    let start = 0;
    while (start < page.length) {
      const index = page.indexOf(word.toLowerCase(), start);
      if (index === -1) {
        break;
      }
      if (
        index + word.length < page.length &&
        page[index].toLowerCase() === page[index + word.length].toLowerCase()
      ) {
        break;
      }
      score.basicScore = score.basicScore + 1;
      start = index + word.length;
    }
    let externalLink: RegExpExecArray | null = externalLinkRe.exec(page);
    while (externalLink !== null) {
      console.log(externalLink);
      score.linkLen = score.linkLen + 1;
      externalLink = externalLinkRe.exec(page);
    }
    const siteName = page.match(siteRe)![1];
    siteMap.set(siteName, index);
    scores.push(score);
  }
  for (let index = 0; index < size; index++) {
    const page = pages[index];
    let externalLink: RegExpExecArray | null = externalLinkRe.exec(page);
    while (externalLink !== null) {
      const found = siteMap.get(externalLink[1]);
      if (typeof found !== 'undefined') {
        scores[found].linkScore =
          scores[found].linkScore +
          scores[index].basicScore / scores[index].linkLen;
      }
      externalLink = externalLinkRe.exec(page);
    }
  }
  let answer = 0;
  for (let index = 1; index < size; index++) {
    if (
      scores[index].basicScore + scores[index].linkScore >
      scores[answer].basicScore + scores[answer].linkScore
    ) {
      answer = index;
    }
  }
  return answer;
};

console.log(
  solution('blind', [
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n <meta charset="utf-8">\n <meta property="og:url" content="https://a.com"/>\n</head> \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n <meta charset="utf-8">\n <meta property="og:url" content="https://b.com"/>\n</head> \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n <meta charset="utf-8">\n <meta property="og:url" content="https://c.com"/>\n</head> \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>',
  ])
);
