/**
 * Created by ornitho13 on 14/04/2018.
 */
(function(){
    var SeoCSS = {
        h1 : {},
        link: {'title' : 'Link status', data : [], nbError : 0, nbWarning : 0},
        img : {'title' : 'Image Status', data : [], nbError : 0, nbWarning : 0},
        meta : {'title' : 'Meta Status', data : [], nbError : 0, nbWarning : 0},
        perf : {'title' : 'Performance Status', data : [], nbError : 0, nbWarning : 0},
        hierarchy : {'title' : 'Hierarchy Status', data : [], nbError : 0, nbWarning : 0},
        point : 0,
        total : 0,
        init : function () {
            this.prepareIcon()
                .getHierarchy()
                .getImage()
                .getLink()
                .getPerformance()
                .getMeta()
          
                .prepareBar()
            ;
        },
        getMeta : function () {
            var viewport = document.querySelectorAll('meta[name="viewport"]');
            this.total++;
            if (viewport.length > 0) {
                viewport = viewport[0];
                var contentV = viewport.getAttribute('content');                
                if (contentV !== null) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-success">Mobile Viewport detected</div>' +
                        '<div class="vision-seo-source"><code>' + viewport.outerHTML.trim().replace('<', '&lt;').replace('>', '&gt;') + '</code></div>'
                    );
                    this.point++;
                } else {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">Mobile Viewport not detected</div>'
                    );
                    this.meta.nbError++;
                }
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-warning">Mobile Viewport not detected</div>'
                );
                this.meta.nbError++;
            }


            var canonical = document.querySelectorAll('link[rel="canonical"]');
            this.total++;
            if (canonical.length > 0) {
                canonical = canonical[0];
                //noinspection JSValidateTypes
                if (canonical.getAttribute('href') === null || canonical.getAttribute('href').trim() === '') {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">canonical not exist or exist but have no value</div>'
                    );
                    this.meta.nbError++;
                } else {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-success">canonical exist</div>' +
                        '<div class="vision-seo-source"><code>' + canonical.outerHTML.trim().replace('<', '&lt;').replace('>', '&gt;') + '</code></div>'
                    );
                    this.point++;
                }
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-warning">canonical not exist or exist but have no value</div>'
                );
            }

            var robots = document.querySelectorAll('meta[name="robots"]');
            
            this.total++;
            if (robots.length > 0) {
                robots = robots[0];
                var content = robots.getAttribute('content');
                if (content !== null) {
                    var exp = new RegExp('(noindex|none)', 'i');

                    if (content.match(exp)) {
                        this.meta.nbError++;
                        this.meta.data.push(
                            '<div class="vision-seo-item seo-css-error">Page is blocked from indexing</div>' +
                            '<div class="vision-seo-source"><code>' + robots.outerHTML.trim().replace('<', '&lt;').replace('>', '&gt;') + '</code></div>'
                        );
                    } else {
                        this.meta.data.push(
                            '<div class="vision-seo-item seo-css-success">Page isn\'t blocked from indexing</div>'
                        );
                        this.point++;
                    }
                } else {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-success">Page isn\'t blocked from indexing</div>'
                    );
                    this.point++;
                }
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-success">Page isn\'t blocked from indexing</div>'
                );
            }

            var eltTitle = document.getElementsByTagName('title'),
                eltDesc = document.querySelectorAll('meta[name="description"]');
            this.total++;
            if (eltDesc.length === 1) {
                var txtDesc = eltDesc[0].getAttribute('content'),
                    nbCharDesc = txtDesc.length;
                if (nbCharDesc === 0) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-error">description is empty<span>' + nbCharDesc + ' chars</span></div>' +
                        '<div class="vision-seo-tips">description size should be between 50 to 300 characters</div>'
                    );
                    this.meta.nbError++;
                } else if (nbCharDesc < 50) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">description is too small <span>' + nbCharDesc + ' chars</span></div>' +
                        '<div class="vision-seo-tips">description size should be between 50 to 300 characters</div>'
                    );
                    this.point += 0.5;
                    this.meta.nbWarning++;
                } else if (nbCharDesc > 50 && nbCharDesc < 300) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-success">description has the good size <span>' + nbCharDesc + ' chars</span></div>' +
                        '<div class="vision-seo-tips">description size should be between 50 to 300 characters</div>'
                    );
                    this.point++;
                } else {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">description is too long <span>' + nbCharDesc + ' chars</span></div>' +
                        '<div class="vision-seo-tips">description size should be between 50 to 300 characters</div>'
                    );
                    this.point += 0.5;
                    this.meta.nbWarning++;
                }
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-error">description is missing</div>' +
                    '<div class="vision-seo-tips">description size should be between 50 to 300 characters</div>'
                );
                this.meta.nbError++;
            }

            this.total++;
            if (eltTitle.length === 1) {
                var txtTitle = eltTitle[0].innerHTML,
                    nbCharTitle = txtTitle.length;
                if (nbCharTitle > 35 && nbCharTitle < 60) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-success">title has the good size <span>' + nbCharTitle + ' chars</span></div>' +
                        '<div class="vision-seo-tips">title size should be between 35 to 50 characters</div>'
                    );
                    this.point++;
                } else if (nbCharTitle < 30) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">title is too small <span>' + nbCharTitle + ' chars</span></div>' +
                        '<div class="vision-seo-tips">title size should be between 35 to 50 characters</div>'
                    );
                    this.point += 0.5;
                    this.meta.nbWarning++;
                } else if (nbCharTitle === 0) {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-error">title is empty <span>' + nbCharTitle + ' chars</span></div>' +
                        '<div class="vision-seo-tips">title size should be between 35 to 50 characters</div>'
                    );
                    this.meta.nbError++;
                } else {
                    this.meta.data.push(
                        '<div class="vision-seo-item seo-css-warning">title is too long <span>' + nbCharTitle + ' chars</span></div>' +
                        '<div class="vision-seo-tips">title size should be between 35 to 50 characters</div>'
                    );
                    this.point += 0.5;
                    this.meta.nbWarning++;
                }
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-error">title is missing</span></div>' +
                    '<div class="vision-seo-tips">title size should be between 35 to 50 characters</div>'
                );
            }

            //opengraph behavior
            var twitterElt = document.querySelectorAll('meta[property^="twitter"]'),
                ogElt = document.querySelectorAll('meta[property^="og:"]');
            this.total++;
            if (twitterElt.length > 0) {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-success">Twitter graph detected</div>'
                );
                this.point++;
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-warning">Twitter graph not detected</div>'
                );
                this.point += 0.5;
                this.meta.nbWarning++;
            }

            this.total++;
            if (ogElt.length > 0) {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-success">Facebook Open graph detected</div>'
                );
                this.point++;
            } else {
                this.meta.data.push(
                    '<div class="vision-seo-item seo-css-warning">Facebook Open graph not detected</div>'
                );
                this.point += 0.5;
                this.meta.nbWarning++;
            }
          
            return this;
        },
        getPerformance : function () {
            var nbNode = document.getElementsByTagName('*').length,
                self = this;
            this.total++;
            if (nbNode > 1000) {
                this.perf.nbError++;
            } else {
                this.point++;
            }
            this.perf.data.push(
                '<div class="vision-seo-item ' + (nbNode < 1000 ? 'seo-css-success' : 'seo-css-error') + '">' + (
                    nbNode > 1000 ? 'too many node in page (' + nbNode + ' nodes)' : 'under 1000 nodes (' + nbNode + ' nodes)'
                ) + '</div>'
            );
            this.total++;
            var isHttps = location.protocol === 'https:';
            if (isHttps === false) {
                this.perf.nbError++;
            } else {
                this.point++;
            }
            this.perf.data.push(
                '<div class="vision-seo-item ' + (isHttps ? 'seo-css-success' : 'seo-css-error') + '">' + (
                    isHttps ? 'Your site is https' : 'Your site is not https'
                ) + '</div>'
            
            );

            window.addEventListener('load', function () {
                this.total++;
                if ('performance' in window) {
                    //noinspection JSUnresolvedVariable
                    var time = (performance.timing.loadEventStart - performance.timing.navigationStart);
                    self.perf.data.push(
                        '<div class="vision-seo-item ' + (time > 2500 ? 'seo-css-error' : (time > 1500 ? 'seo-css-warning' : 'seo-css-success')) + 
                        '">loading time  <span>' + time + ' ms</span></div>' +
                        '<div class="vision-seo-tips">page loading time should be under 1 500 ms</div>'
                    );
                    this.total++;
                    if (time > 2500) {
                        self.perf.nbError++;
                    } else if (time > 1500 && time < 2500) {
                        this.point += 0.5;
                        self.perf.nbWarning++;
                    } else {
                        this.point++;
                    }
                }
            });
            
            return this;
        },
        getLink : function () {
            var a = document.querySelectorAll('a'),
                nb = 0,
                nbBlank = 0,
                nbTitle = 0;
            a.forEach(function(item){
                if (item.innerHTML.trim() === '') {
                    nb++;
                }
                if (item.getAttribute('target') === '_blank') {
                    nbBlank++;
                }
                //noinspection JSValidateTypes
                if (item.getAttribute('title') === '' || item.getAttribute('title') === null) {
                    nbTitle++;
                }
            });
            this.total++;
            if (nb > 0) {
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-error">A with empty content : <span>' + nb + '</span></div>'
                );
                this.link.nbError++;
            } else {
                this.point++;
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-success">A with empty content : <span>0</span></div>'
                );
            }
            this.total++;
            if (nbBlank > 0) {
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-warning">' + 
                    '<input class="vision-seo-checkbox" type="checkbox" data-click=\'a[target="_blank"]\' title="reveal"/>' + 
                    'A with target="_blank" : <span>' + nbBlank + '</span></div>'
                );
                this.point += 0.5;
                this.link.nbWarning++;
            } else {
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-success">A with target="_blank" : <span>0</span></div>'
                );
                this.point++;
            }
            this.total++;
            if (nbTitle > 0) {
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-warning">A with title attribute : <span>' + nbTitle + '</span></div>'
                );
                this.point += 0.5;
                this.link.nbWarning++;
            } else {
                this.link.data.push(
                    '<div class="vision-seo-item seo-css-success">A with title attribute : <span>0</span></div>'
                );
                this.point++;
            }

            var nbAWithoutHref = document.querySelectorAll('a:not([href]), a[href=""]').length;
            this.link.data.push(
                '<div class="vision-seo-item ' + (nbAWithoutHref > 0 ? 'seo-css-error' : 'seo-css-success') + 
                '">' + (nbAWithoutHref > 0 ? '<input class="vision-seo-checkbox" type="checkbox" data-click=\'a:not([href]), a[href="]\' title="reveal"/>' : '') + 
                'A without href attribute : <span>' + nbAWithoutHref + '</span></div>'
            );
            this.total++;
            if (nbAWithoutHref > 0) {
                this.link.nbError++;
            } else {
                this.point++;
            }

            return this;
        },
        getImage : function () {
            var nbImgWithoutSrc = document.querySelectorAll('img:not([src]), img[src=""]').length,
                nbImgWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
            this.img.data.push(
                '<div class="vision-seo-item ' + (nbImgWithoutSrc > 0 ? 'seo-css-error' : 'seo-css-success') + 
                '"><input class="vision-seo-checkbox" type="checkbox" data-click=\'img:not([src]), img[src=""]\' title="reveal"/>' + 
                '&lt;img&gt; without src or with empty src<span>' + nbImgWithoutSrc + '</span></div>'
            );
            this.total++;
            if (nbImgWithoutSrc > 0) {
                this.img.nbError++;
            } else {
                this.point++;
            }
            this.img.data.push(
                '<div class="vision-seo-item ' + (nbImgWithoutAlt > 0 ? 'seo-css-error' : 'seo-css-success') + 
                '"><input class="vision-seo-checkbox" type="checkbox" data-click=\'img:not([alt]), img[alt=""]\' title="reveal"/>' + 
                '&lt;img&gt; without alt attribute<span>' + nbImgWithoutAlt + '</span></div>'
            );
            this.total++;
            if (nbImgWithoutAlt > 0) {
                this.img.nbError++;
            } else {
                this.point++;
            }

            return this;
        },
        prepareBar : function () {
            var aside = document.createElement('aside'),
                seoBar = document.createElement('div'),
                self = this
            ;

            seoBar.className = 'vision-seo-bar';
            seoBar.innerHTML = ' <button class="vision-seo-btn" data-type="hierarchy"><i class="material-icons badge seo-css-default">alarm</i>hierarchy</button>' +
                '<button class="vision-seo-btn" data-type="link"><i class="material-icons badge seo-css-default">link</i>link</button>' +
                '<button class="vision-seo-btn" data-type="img"><i class="material-icons badge seo-css-default">insert_photo</i>image</button>' +
                '<button class="vision-seo-btn" data-type="meta"><i class="material-icons badge seo-css-default">code</i>meta</button>' +
                '<button class="vision-seo-btn" data-type="perf"><i class="material-icons badge seo-css-default">alarm</i>Performance</button>'
            ;
            document.body.appendChild(seoBar);

            aside.className = 'vision-seo-aside';
            aside.id = 'vision-seo-aside';
            document.body.appendChild(aside);

            //add all
            function populate (type) {
                var elt = document.createElement('div');
                elt.className = 'vision-seo-content ' + type;
                elt.innerHTML = '<div class="vision-seo-title">' + self[type].title  + '<i class="material-icons vision-seo-close">close</i></div>';
                elt.innerHTML += self[type].data.join('');
                aside.appendChild(elt);
            }

            aside.classList.add('open');

            var button = document.querySelectorAll('.vision-seo-bar button');
            button.forEach(function(item){
                item.addEventListener('click', function(){
                    //var aside = document.getElementById('vision-seo-aside');
                    aside.classList.add('open');
                    document.querySelectorAll('.vision-seo-content').forEach(function(item){
                        item.classList.remove('selected');
                    });
                    //add layout
                    var type = item.getAttribute('data-type');
                    if (typeof self[type] !== 'undefined') {
                        document.querySelectorAll('.vision-seo-content.' + type)[0].classList.add('selected');
                    }

                });
            });
            window.addEventListener('load', function () {
                populate('hierarchy');
                populate('link');
                populate('img');
                populate('meta');
                populate('perf');
                var percent = Math.round((self.point * 100) / self.total);
                var classScore = 'seo-css-error';
                if (percent === 100) {
                    classScore = 'seo-css-success';
                } else if (percent < 100 && percent > 74) {
                    classScore = 'seo-css-almost';
                } else if (percent < 75 && percent > 49) {
                    classScore = 'seo-css-warning';
                } else if (percent < 50 && percent > 10) {
                    classScore = 'seo-css-bad';
                } else {
                    classScore = 'seo-css-error';
                }
                var score = document.createElement('div');
                score.className = 'vision-seo-score ' + classScore;
                score.innerHTML = 'Your SEO score : <span>' + percent + ' %</span>';
                seoBar.appendChild(score);
                //seoBar.innerHTML += '<div class="vision-seo-score">Your SEO score : <span><span>' + self.point + '</span>/' + self.total + '</span></div>';
                button.forEach(function(item){
                    var type = item.getAttribute('data-type');
                    if (typeof self[type] !== 'undefined') {
                        var dataType = self[type];
                        var badge = document.createElement('div');
                        if (dataType.nbError > 0) {
                            badge.className = 'vision-seo-badge seo-css-error';
                            badge.innerHTML = dataType.nbError;
                        } else {
                            if (dataType.nbWarning > 0) {
                                badge.className = 'vision-seo-badge seo-css-warning';
                                badge.innerHTML = dataType.nbWarning;
                            } else {
                                badge.className = 'vision-seo-badge seo-css-success';
                                badge.innerHTML = '<i class="material-icons">done</i>';
                            }
                        }
                        item.appendChild(badge);
                    }
                });
                aside.addEventListener('click', function (item) {
                    var elt = item.target;
                    if (elt.classList.contains('vision-seo-checkbox')) {
                        var click = elt.getAttribute('data-click');
                        document.querySelectorAll(click).forEach(function(child){
                            child.classList.toggle('vision-seo-reveal');
                        });
                    } 
                    if (elt.classList.contains('vision-seo-close')) {
                        aside.classList.remove('open');
                    }
                }, true);
                
            });

            return this;
        },
        getHierarchy : function () {
            var hs = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                hsNotFound = '',
                msg = 'Hierarchy has no issue detected'
            ;
            
            hs.map(function(item) {
                if (document.getElementsByTagName(item).length > 0) {
                    if (hsNotFound !== '') {
                        msg = ' ' + hsNotFound + ' not found but ' + item + ' found';
                    }
                } else {
                    hsNotFound = item;
                }
            });

            this.hierarchy.data.push(
                '<div class="vision-seo-item ' + (hsNotFound !== '' ? 'seo-css-error' : 'seo-css-success') + 
                '">' + msg + '</div>'
            );
            this.total++;
            if (hsNotFound !== '') {
                this.hierarchy.nbError++;
            } else {
                this.point++;
            }
            var h1 = document.querySelectorAll('h1'),
                nbH1 = h1.length;
            this.total++;
            if (nbH1 === 0) {
                this.hierarchy.data.push(
                    '<div class="vision-seo-item seo-css-warning">No h1 detected<span>' + nbH1 + '</span></div>'
                );
                this.point += 0.5;
                this.hierarchy.nbWarning++;
            } else if (nbH1 > 1) {
                this.hierarchy.data.push(
                    '<div class="vision-seo-item seo-css-error">' + 
                    '<input class="vision-seo-checkbox" type="checkbox" data-click=\'h1\' title="reveal"/>' + 
                    'Too many h1 detected<span>' + nbH1 + '</span></div>'
                );
                this.hierarchy.nbError++;
            } else {
                this.hierarchy.data.push(
                    '<div class="vision-seo-item seo-css-success">h1 detected<span>' + nbH1 + '</span></div>'
                );
                this.point++;
            }

            return this;

        },
        prepareIcon : function () {
            var icon = document.createElement('link');
            icon.rel = 'stylesheet';
            icon.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
            document.head.appendChild(icon);
            var police = document.createElement('link');
            police.rel = 'stylesheet';
            police.href = 'https://fonts.googleapis.com/css?family=Cousine';
            document.head.appendChild(police);

            return this;
        }
    };

    SeoCSS.init();
})();
