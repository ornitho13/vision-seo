/**
 * Created by ornitho13 on 14/04/2018.
 */
;(function(){
    var SeoCSS = {
        h1 : {},
        https : {},
        aHref : {},
        aBlank : {},
        title : {},
        description : {},
        aContent : {},
        aTitle : {},
        imgSrc : {},
        imgAlt : {},
        viewport : {},
        node : {},
        init : function () {
            this.prepareIcon()
                .countH1()
                .checkHierarchy()
                .countImgIssue()
                .countAIssue()
                .detectViewport()
                .isHttps()
                .checkDescriptionTitle()
                .hasCanonical()
                .getNbNode()

                .prepareBar()
            ;
        },
        getNbNode : function () {
            var nbNode = document.getElementsByTagName('*').length;
            this.node = {
                nb : nbNode,
                msg : nbNode > 1000 ? 'too many node in page (' + nbNode + ' nodes)' : 'under 1000 nodes (' + nbNode + ' nodes)',
                class : nbNode < 1000 ? 'seo-css-success' : 'seo-css-error'
            };

            return this;
        },
        hasCanonical : function () {
            this.canonical = {
                class : 'seo-css-warning',
                msg : 'canonical not exist'
            };
            var canonical = document.querySelectorAll('meta[name="canonical"]');
            if (canonical.length > 0) {
                canonical = canonical[0];
                //noinspection JSValidateTypes
                if (canonical.getAttribute('content') === null || canonical.getAttribute('content').trim() === '') {
                    this.canonical = {
                        class : 'seo-css-error',
                        msg : 'canonical exist but have no value'
                    };
                } else {
                    this.canonical = {
                        class : 'seo-css-success',
                        msg : 'canonical not exist'
                    };
                }
            }
            return this;
        },
        checkDescriptionTitle : function () {
            this.title = {
                exist : false,
                class : 'seo-css-error',
                nbCharacter : 0,
                msg : 'title not exist !'
            };
            this.description = {
                exist : false,
                class : 'seo-css-error',
                nbCharacter : 0,
                msg : 'description not exist !'
            };
            var eltTitle = document.getElementsByTagName('title'),
                eltDesc = document.querySelectorAll('meta[name="description"]');
            if (eltDesc.length === 1) {
                var txtDesc = eltDesc[0].innerHTML,
                    nbCharDesc = txtDesc.length;
                if (nbCharDesc === 0) {
                    this.description = {
                        exist : true,
                        class : 'seo-css-error',
                        nbCharacter : 0,
                        msg : 'description empty'
                    };
                } else if (nbCharDesc < 50) {
                    this.description = {
                        exist : true,
                        class : 'seo-css-error',
                        nbCharacter : nbCharDesc,
                        msg : 'description to small'
                    };
                } else if (nbCharDesc > 50 && nbCharDesc < 300) {
                    this.description = {
                        exist : true,
                        class : 'seo-css-success',
                        nbCharacter : nbCharDesc,
                        msg : 'perfect size !'
                    };
                } else {
                    this.description = {
                        exist : true,
                        class : 'seo-css-warning',
                        nbCharacter : nbCharDesc,
                        msg : 'description too long'
                    };
                }
            }
            if (eltTitle.length === 1) {
                var txtTitle = eltTitle[0].innerHTML,
                    nbCharTitle = txtTitle.length;
                if (nbCharTitle > 35 && nbCharTitle < 60) {
                    this.title = {
                        exist : true,
                        class : 'seo-css-success',
                        nbChar : nbCharTitle,
                        msg : 'perfect size !'
                    }
                } else if (nbCharTitle < 30) {
                    this.title = {
                        exist : true,
                        class : 'seo-css-warning',
                        nbChar : nbCharTitle,
                        msg : 'not enough character'
                    }
                } else if (nbCharTitle === 0) {
                    this.title = {
                        exist : true,
                        class : 'seo-css-error',
                        nbChar : nbCharTitle,
                        msg : 'empty title !'
                    }
                } else {
                    this.title = {
                        exist : true,
                        class : 'seo-css-warning',
                        nbChar : nbCharTitle,
                        msg : 'title too long'
                    }
                }

            }

            return this;

        },
        isHttps : function () {
            var isHttps = location.protocol === 'https:';
            this.https = {is : isHttps, class : (isHttps ? 'seo-css-success' : 'seo-css-error')};
            return this;
        },
        detectViewport : function () {
            var children = document.head.children;
            this.viewport = {
                has : 0,
                class : 'seo-css-error'
            };
            for (var obj in children) {
                if (children.hasOwnProperty(obj)) {
                    var item = children[obj];
                    if (item.tagName === 'META' && item.getAttribute('name') === 'viewport') {
                        this.viewport = {
                            has : 1,
                            class : 'seo-css-success'
                        };
                    }
                }
            }

            return this;
        },
        countAIssue : function () {
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
            if (nb > 0) {
                this.aContent = {
                    nb : nb,
                    class: 'seo-css-error'
                }
            } else {
                this.aContent = {
                    nb : nb,
                    class: 'seo-css-success'
                }
            }
            if (nbBlank > 0) {
                this.aBlank = {
                    nb : nbBlank,
                    class: 'seo-css-warning'
                }
            } else {
                this.aBlank = {
                    nb : nbBlank,
                    class: 'seo-css-success'
                }
            }
            if (nbTitle > 0) {
                this.aTitle = {
                    nb : nbTitle,
                    class: 'seo-css-warning'
                }
            } else {
                this.aTitle = {
                    nb : nbTitle,
                    class: 'seo-css-success'
                }
            }

            var nbAWithoutHref = document.querySelectorAll('a:not([href]), a[href=""]').length;
            this.aHref = {
                nb : nbAWithoutHref,
                class : nbAWithoutHref > 0 ? 'seo-css-error' : 'seo-css-success'
            };

            return this;
        },
        countImgIssue : function () {
            var nbImgWithoutSrc = document.querySelectorAll('img:not([src]), img[src=""]').length;
            this.imgSrc = {
                nb : nbImgWithoutSrc,
                class : nbImgWithoutSrc > 0 ? 'seo-css-error' : 'seo-css-success'
            };
            var nbImgWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
            this.imgAlt = {
                nb : nbImgWithoutAlt,
                class : nbImgWithoutAlt > 0 ? 'seo-css-error' : 'seo-css-success'
            };

            return this;
        },
        prepareBar : function () {
            var bar = document.createElement('div');
            bar.className = 'seo-css-bar';
            //H1.parta
            var h1HTML = '<div class="left h1 has-sub" title="number of H1">H1<span class="badge sub ' + this.h1.class + '">' + this.h1.nb + '</span></div>',
                hierarchyProblem = '<div class="left icon-only no-bold" title="' + this.hierarchy.error + '"><i class="material-icons badge ' +
                    this.hierarchy.class + '">format_list_numbered</i></div>',
                httpsHTML = '<div class="left icon-only no-bold" title="is a secure site ?"><i class="material-icons badge ' + this.https.class +
                    '">http</i></div>',
                aWithoutHrefHTML = '<div class="left has-sub" title="&lt;a&gt; without link or empty link"><i class="material-icons">link</i>' +
                    '<span class="badge sub ' + this.aHref.class + '">' + this.aHref.nb + '</span></div>',
                aWithoutContentHTML = '<div class="left has-sub" title="&lt;a&gt; without content"><i class="material-icons">link</i>' +
                    '<span class="badge sub ' + this.aContent.class + '">' + this.aContent.nb + '</span></div>',
                aWithoutTitle = '<div class="left has-sub" title="&lt;a&gt; without title"><i class="material-icons">link</i>' +
                    '<span class="badge sub ' + this.aTitle.class + '">' + this.aTitle.nb + '</span></div>',
                aWithBlankHTML = '<div class="left has-sub" title="&lt;a&gt; with target _blank"><i class="material-icons">queue_play_next</i>' +
                    '<span class="badge sub ' + this.aBlank.class + '">' + this.aBlank.nb + '</span></div>',
                imgWithoutSrcHTML = '<div class="left has-sub" title="&lt;img&gt; without src or empty src"><i class="material-icons">insert_photo</i>' +
                    '<span class="badge sub ' + this.imgSrc.class + '">' + this.imgSrc.nb + '</span></div>',
                imgWithoutAltHTML = '<div class="left has-sub" title="&lt;img&gt; without alt or empty alt"><i class="material-icons">subtitles</i>' +
                    '<span class="badge sub ' + this.imgAlt.class + '">' + this.imgAlt.nb + '</span></div>',
                viewportHTML = '<div class="left icon-only no-bold" title="has viewport ?"><i class="material-icons badge ' + this.viewport.class +
                    '">perm_device_information</i></div>',
                titleDescription = '<div class="left icon-only no-bold" title="' + this.title.msg + '"><i class="material-icons badge ' + this.title.class +
                    '">title</i></div>' +
                    '<div class="left icon-only no-bold" title="' + this.description.msg + '"><i class="material-icons badge ' + this.description.class +
                    '">title</i></div>',
                canonicalHTML = '<div class="left icon-only no-bold" title="' + this.canonical.msg + '"><i class="material-icons badge ' +
                    this.canonical.class + '">title</i></div>',
                nodeHTML = '<div class="left icon-only no-bold" title="' + this.node.msg + '"><i class="material-icons badge ' + this.node.class +
                    '">code</i></div>',
                performanceHTML = '';

            window.addEventListener('load', function(){
                if ('performance' in window) {
                    //noinspection JSUnresolvedVariable
                    var time = (performance.timing.loadEventStart - performance.timing.navigationStart);
                    var performanceHTML = document.createElement('div');
                    performanceHTML.className = 'left icon-only no-bold';
                    performanceHTML.title = time + ' ms';
                    performanceHTML.innerHTML = '<div class="" title="' + time + ' ms"><i class="material-icons badge ' + (time > 2500 ? 'seo-css-error' : (time > 1500 ? 'seo-css-warning' : 'seo-css-success')) + '">alarm</i></div>';
                    bar.appendChild(performanceHTML);
                }
            });


            bar.innerHTML = h1HTML + hierarchyProblem + httpsHTML + aWithoutHrefHTML + aWithoutContentHTML + aWithoutTitle + aWithBlankHTML + imgWithoutAltHTML
                + imgWithoutSrcHTML + viewportHTML + titleDescription + canonicalHTML + nodeHTML + performanceHTML;
            document.body.appendChild(bar);
            return this;
        },
        checkHierarchy : function () {
            var hs = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                hsNotFound = '',
                self = this;
            this.hierarchy = {
                class: 'seo-css-success',
                error : 'seems to have no error'
            };
            hs.map(function(item) {
                if (document.getElementsByTagName(item).length > 0) {
                    if (hsNotFound !== '') {
                        self.hierarchy = {
                            class: 'seo-css-error',
                            error: ' ' + hsNotFound + ' not found but ' + item + ' found'
                        }
                    }
                } else {
                    hsNotFound = item;
                }
            });
            return this;
        },
        countH1 : function () {
            var h1 = document.querySelectorAll('h1'),
                nbH1 = h1.length;
            if (nbH1 === 0) {
                this.h1 = {
                    elt : null,
                    nb : nbH1,
                    class : 'seo-css-warning'
                }
            } else if (nbH1 > 1) {
                this.h1 = {
                    elt : h1,
                    nb : nbH1,
                    class : 'seo-css-error'
                }
            } else {
                this.h1 = {
                    elt : h1,
                    nb : nbH1,
                    class : 'seo-css-success'
                }
            }

            return this;
        },
        prepareIcon : function () {
            var icon = document.createElement('link');
            icon.rel = 'stylesheet';
            icon.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
            document.head.appendChild(icon);

            return this;
        }
    };

    SeoCSS.init();
})();
