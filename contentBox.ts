///*********************************************************************************
// ContentBox Module v1                                                           //
// Usage : just make instance >> let contentBox = new ContentBox();               //
// Author: Ayman Elkhouly >>                                                      //
///*********************************************************************************


///*********************************************************************************
// Global Varible Declaration  For  Modules to use it in ContentBox         //
///*********************************************************************************
declare var drawingSurface: any;
declare var shapeObj: any;
declare var createLesson: any;
declare var imageTools: any;
declare var copyPasteHelper: any;
declare var animateable: any;
declare var tinyMCE: any;
declare var sound: any;

class ContentBox {
    public contentBoxString: string;
    public nTextButtonString: string;
    public nTextButton: HTMLElement;
    public animationToolbarString: string;
    public animationToolbar: HTMLElement;
    public contentTypeEnum: any;
    public activeBoxContentType: any;
    public activeContentBoxData: any;
    public activeContentBox: HTMLElement;
    public lastActiveConetntBox: HTMLElement;
    public contentBoxNumber: string;
    public contentBoxCustomeEvent: any;
    public contentBoxBluredEvent: string;
    public contentBoxActiveEvent: string;
    public contentBoxDeletedEvent: string;
    public contentBoxCreatedEvent: string;
    public contentBoxModifiedEvent: string;
    public contentBoxSendToSave: string;
    public specialActiveCases: Array<string> = [];

    constructor() {
        this.contentTypeEnum = createLesson.contentTypeEnum;
        this.contentBoxModifiedEvent = "contentBoxChanged";
        this.contentBoxCreatedEvent = "contentBoxCreated";
        this.contentBoxDeletedEvent = "contentBoxDeleted";
        this.contentBoxBluredEvent = "contentBoxBlured";
        this.contentBoxActiveEvent = "contentBoxActiveted";
        this.contentBoxSendToSave = "contentBoxSendToSave";
        this.specialActiveCases = [".NTextbutton", ".animation-toolbar", "#imageTools", "#ModelNewItem", "#toolBars",
            "#ModelExistingItem", "#lessonOnlyPopUp", "#openVideoModal", "#context-menu", "#pasteObj", "#dvNewMenu",
            "#FontModal", "#soundTools", ".colorpicker", "#table-model", ".select2-dropdown", ".mce-container-body",
            "#new-contentBox", ".mce-menu-item", ".custome-buttons", "#shapeLibraryModal",".modal-tools__insert"];
        this.initialize();
    }

    ///*********************************************************************************
    // Method initializer                                                             //
    ///*********************************************************************************
    initialize() {
        const self = this;
        this.setHtmlString();
        this.startMutationDomObserver();
        this.appendHtMlStringElements();
    }

    ///*********************************************************************************
    // Add HTML string To Put it to DOM                                               //
    ///*********************************************************************************
    setHtmlString() {
        this.nTextButtonString = `<div class="NTextbutton" data-resizeable="false" style="display:none">
                                        <div class="default-buttons">
                                           <a class="systemLogger" data-tool-id="25" data-toggle="tooltip"  data-placement="left" title="Delete" onclick="copyPasteHelper.deleteContainer();"><img src="/Content/images/delete.svg"> </a>
                                           <a class="systemLogger" data-tool-id="27"  data-toggle="tooltip" data-placement="left" title="Copy" onclick="copyPasteHelper.copyObjectWraper();"><img src="/Content/images/copy.svg"> </a>
                                           <a class="systemLogger" data-tool-id="26"  data-toggle="tooltip" data-placement="left" title="Cut" onclick="copyPasteHelper.cutObjectWraper();"><img src="/Content/images/cut.svg"> </a>
                                        </div>
                                        <div class="custome-buttons"></div>
                                  </div>`;

        this.contentBoxString = `<div class="pres-newContainer latestContainer SliderThumbnail" tabindex="" data-options="onDrag:onDrag" animation-save="false" data-order-input="0" style="height: 161px; width: 222px; left: 575px; top: 305px;">
                                   <div class="containerData"></div>
                                   <div id="orderValue" class="animation-conf animation-order">0</div>
                                 </div>`;

        const contentTypeArr = [this.contentTypeEnum.video, this.contentTypeEnum.sound, this.contentTypeEnum.question, this.contentTypeEnum.game];
        const timerStateClass = (contentTypeArr as any).includes(this.activeBoxContentType) ? ' animation__timer--hide' : '';
        this.animationToolbarString = `
            <div class="animation-conf animation-toolbar" style="display:none" data-html2canvas-ignore>
                <div class="animation__item animation__order systemLogger"  data-tool-id="28">
                    <span><i class="svg-icon svg-icon--arrow arrow-top"></i><i class="svg-icon svg-icon--arrow arrow-bottom"></i></span>
                    <input id="orderInput" type="number" value="0" min="0" onchange="animateable.attachAnimation(this, 'orderInput')" data-toggle="tooltip" data-placement="top" title="Order">
                </div>
                <div class="systemLogger animation__item animation__timer ${timerStateClass.toString()}" data-tool-id="29">
                    <span><i class="svg-icon svg-icon--timer"></i></span>
                    <input id="timerMinutes" type="number" min="0" max="59" maxlength="2" value="0" onchange="animateable.attachAnimation(this, 'timerMinutes')" data-toggle="tooltip" data-placement="top" title="Timer Minutes">
                    <input id="timerSeconds" type="number" min="0" max="59" maxlength="2" value="0" onchange="animateable.attachAnimation(this, 'timerSeconds')" data-toggle="tooltip" data-placement="top" title="Timer Second" >
                    <input id="timerMilliseconds" type="number" min="0" max="999" maxlength="3" value="0" onchange="animateable.attachAnimation(this, 'timerMilliseconds')" data-toggle="tooltip" data-placement="top" title="Timer Millisecond" >
                </div>
                <div class="animation__item animation__action">
                    <button class="systemLogger" data-tool-id="30" id="animationAction" data-toggle="tooltip" data-placement="top" title="Action" data-boxState="hidden" onclick="animateable.toggleAimationBox(this)"><i class="svg-icon svg-icon--action"></i></button>
                </div>
                <div class="animation-box" id="animationBox" tabindex="0">
                    <div class="entrance-content animation-content">
                        <div class="content-header">
                            <h2>Entrance Animation</h2>
                            <span><i class="svg-icon svg-icon--rotate" onclick="animateable.resetAnimations(this, 'entranceType')"></i></span>
                        </div>
                        <div class="row animation-type">
                            <select class="custom-select animation-select animation-select--type" id="entranceType" onchange="animateable.attachAnimation(this, 'entranceType')">
                                <option value="default" selected>Choose Type...</option>
                                ${animateable.animations.entrance.map(item => {
            return `<option value="${item.title.value}">${item.title.text}</option>`
        }).join('')}
                            </select>
                            <select class="custom-select animation-select animation-select--direction" id="entranceDirection" onchange="animateable.attachAnimation(this, 'entranceDirection')"></select>
                        </div>
                        <div class="row animation-timing">
                            <p><span><i class="svg-icon svg-icon--duration"></i></span>Duration</p>
                            <select class="custom-select animation-select animation-select--type" id="entranceDuration" onchange="animateable.attachAnimation(this, 'entranceDuration')">
                                <option value="default" selected>Choose Duration...</option>
                                ${animateable.animations.duration.map(item => {
            return `<option value="${item.value}">${item.text}</option>`
        }).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="exit-content animation-content">
                        <div class="content-header">
                            <h2>Exit Animation</h2>
                            <span><i class="svg-icon svg-icon--rotate" onclick="animateable.resetAnimations(this, 'exitType')"></i></span>
                        </div>
                        <div class="row animation-type">
                            <select class="custom-select animation-select animation-select--type" id="exitType" onchange="animateable.attachAnimation(this, 'exitType')">
                                <option value="default" selected>Choose Type...</option>
                                ${animateable.animations.exit.map(item => {
            return `<option value="${item.title.value}">${item.title.text}</option>`
        }).join('')}
                            </select>
                            <select class="custom-select animation-select animation-select--direction" id="exitDirection" onchange="animateable.attachAnimation(this, 'exitDirection')"></select>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    ///*********************************************************************************
    // Create Custom event                                                            //
    ///*********************************************************************************
    createCustomeEvent(description: any, detail: any) {
        this.contentBoxCustomeEvent = new CustomEvent(description, {
            bubbles: true,
            detail
        });
        document.dispatchEvent(this.contentBoxCustomeEvent);
    }


    ///*********************************************************************************
    //  Watch Changes On DOM Content                                                  //
    ///*********************************************************************************
    startMutationDomObserver(targetNode?: Node) {

        // Select the node that will be observed for mutations
        targetNode = targetNode || document.querySelector('#presMainContent');

        // Options for the observer (which mutations to observe)
        let config = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        }
        // Callback function to execute when mutations are observed
        let callback = function (mutationsList, observer) {
            let runEvent = false;
            let mutation;
            let detailObject;
            for (let i = 0; i < mutationsList.length; i++) {
                mutation = mutationsList[i];
                if (mutation.target && mutation.type !== "characterData" && mutation.target.closest(".activeContainer")) {
                    if (mutation.target.closest(".containerData") && mutation.target.nodeName !== "CANVAS") {
                        runEvent = true;
                    }
                    if (runEvent && (mutationsList.length == i + 1)) {
                        //Setting ContentBox Data , ContentType From ActiveConetntBox
                        this.getContentboxData(this.activeContentBox);

                        //** Firing ContentBox contentBoxChanged Custom Event on Current ActiveConetntBox **//
                        detailObject = {
                            target: this.activeContentBox,
                            contentType: this.activeBoxContentType,
                            data: this.activeContentBoxData,
                            changedList: mutationsList
                        };
                        this.createCustomeEvent(this.contentBoxModifiedEvent, detailObject);

                        return;
                    }
                }
            }
        }.bind(this);

        // Create an observer instance linked to the callback function
        let observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }


    ///*********************************************************************************
    // Create A New ContentBox                                                        //
    ///*********************************************************************************
    createContentBox(activeTab?: HTMLElement, domId?: string, forceAvtive?: boolean) {
        //** flag to active contentBox immediately **//
        forceAvtive = forceAvtive || false

        //** set active tab from param or get it **// 
        activeTab = activeTab || document.querySelector("#presMainContent div.tab-pane.active.show");

        //** check maxmium zIndex on contentBox then insert a new one higher **//
        let lastZindex = (this.getBoxsZIndex("ascending", true) ? this.getBoxsZIndex("ascending", true)[0].zIndex : 1);

        //** Generate ContentBox Number **//
        this.contentBoxNumber = (domId ? domId.replace("ContentBox", "") : createLesson.getUniqueId());

        //** Convert ContentBox HTML String To HTML DOM Element **//
        let contentBox = new DOMParser().parseFromString(this.contentBoxString, 'text/html').body.childNodes[0];

        //** Generate A New ContentBox Random Position dimensions **//
        let contentBoxPosition = this.randomContentBoxPosition();

        //** Set ContentBox Attribute & Styles **//
        (<HTMLElement>contentBox).style.zIndex = lastZindex + 1 || 1;
        (<HTMLElement>contentBox).id = (domId ? domId : "ContentBox" + this.contentBoxNumber);
        (<HTMLElement>contentBox).setAttribute("tabindex", createLesson.getTabIndex());
        (<HTMLElement>contentBox).children[0].id = "dvContainerData" + this.contentBoxNumber;
        (<HTMLElement>contentBox).style.top = contentBoxPosition.top + "px";
        (<HTMLElement>contentBox).style.left = contentBoxPosition.left + "px";
        (<HTMLElement>contentBox).classList.add("bordered");

        debugger;
        //** Append New ContentBox To Active Tap **//
        activeTab.appendChild(contentBox);

        //** setting new data Object **//
        $(contentBox).data("Data", new Object());
        $(contentBox).data("Data").contentType = 0;
        //$(contentBox).data("Data").additionalData = function () { return null; };
        $(contentBox).data("Data").additionalData = null;

        $(contentBox).data("Data").id = 0;


        //** Fire ContentBox Creation CustomeEvent //**
        let detailObject = {
            target: contentBox,
            contentType: 0,
            data: $(contentBox).data("Data")
        };

        this.createCustomeEvent(this.contentBoxCreatedEvent, detailObject);

        $('[data-toggle="tooltip"]').tooltip();

        //** click on CurrentBox to Activate & fire Activating Event **//
        if (forceAvtive) { (<HTMLElement>contentBox).click(); }

        return this.contentBoxNumber;
    }

    ///*********************************************************************************
    // Generate Random ContentBox Position                                            //
    ///*********************************************************************************
    randomContentBoxPosition() {
        let dimensions = { minTop: 150, maxTop: 450, minLeft: 350, maxLeft: 750 };
        var top = Math.floor(Math.random() * (dimensions.maxTop - dimensions.minTop + 1) + dimensions.minTop);
        var left = Math.floor(Math.random() * (dimensions.maxLeft - dimensions.minLeft + 1) + dimensions.minLeft);
        return { top, left };
    }

    ///*********************************************************************************
    // Get ContentBox ZIndex in New Array[{id,zIndex}]                                //
    ///*********************************************************************************
    getBoxsZIndex(order: string, flag?: boolean, databaseId?: boolean, all?: boolean) {

        let contentBoxs;
        if (flag) {
            //** Get All contentBoxs**//
            contentBoxs = document.querySelectorAll("div.tab-pane.SliderThumbnail.active.show div.pres-newContainer");
        }
        else {
            //** Get UnActiveContentBoxs Only **//
            contentBoxs = document.querySelectorAll("div.tab-pane.SliderThumbnail.active.show div.pres-newContainer:not(.activeContainer)");
        }

        let tempArray = [];
        contentBoxs.forEach((item: HTMLElement) => {
            if (databaseId && !all) {
                //** Return Array Of Objects With contentBox id on Database **//
                tempArray.push({ id: $(item).data("Data").id, zIndex: Number(item.style.zIndex) })
            }
            else if (all && !databaseId) {
                //** Return Array Of Objects With contentBox id on Database & on Dom **//
                tempArray.push({ id: item.id, dataBaseId: $(item).data("Data").id, zIndex: Number(item.style.zIndex) })
            }
            else {
                //** Return Array Of Objects With contentBox id on Dom **//
                tempArray.push({ id: item.id, zIndex: Number(item.style.zIndex) })
            }
        });
        tempArray.sort(function (a, b) {
            if (order === "ascending") {
                return b.zIndex - a.zIndex;
            }
            else if (order === "deAscending") {
                return a.zIndex - b.zIndex;
            }
        });

        if (tempArray.length > 0) {
            return tempArray;
        }
        else {
            return null;
        }
    }


    ///*********************************************************************************
    //  Generic Helpers for Other Modulles Like Shape - Tabele -Drawing               //
    ///*********************************************************************************
    genericHelpers() {
        let helpersObject = {
            activeContentbox: this.activeContentBox,
            activeContentboxContainerData: this.activeContentBox.querySelector('.containerData').innerHTML,
            lastActiveContentBox: this.lastActiveConetntBox,
            activeContentBoxType: this.activeBoxContentType,
            activeContentBoxData: this.activeContentBoxData,
            contentBoxsZindexAsc: this.getBoxsZIndex("ascending", true, false, true),
            contentBoxDimension: {
                width: (this.activeContentBox ? this.activeContentBox.style.width : null),
                height: (this.activeContentBox ? this.activeContentBox.style.height : null),
                top: (this.activeContentBox ? this.activeContentBox.style.top : null),
                left: (this.activeContentBox ? this.activeContentBox.style.left : null)
            }
        }
        return helpersObject;
    }


    ///*********************************************************************************
    //  Detect ContentBox Content Type                                                //
    ///*********************************************************************************
    getContentboxData(activeContainer: HTMLElement, customElement?: HTMLElement) {
        if (activeContainer) {
            this.activeContentBoxData = $(activeContainer).data('Data');
            this.activeBoxContentType = this.activeContentBoxData.contentType;
            return this.activeContentBoxData;
        }
        else if (customElement) {
            return $(customElement).data('Data');
        }
        else {
            return null;
        }
    }

    ///*********************************************************************************
    //  Attach NTextButtons To ContentBox Logic                                       //
    ///*********************************************************************************
    attachNTextButtons(activeContainer: HTMLElement) {
        this.nTextButton.style.display = "block";
        this.nTextButton.style.position = "absolute";
        this.nTextButton.style.top = Number(activeContainer.getBoundingClientRect().top) - 65 + "px";
        this.nTextButton.style.left = Number(activeContainer.getBoundingClientRect().left) - 30 + "px";
        this.nTextButton.style.transform = 'scale(.8)';
    }

    ///*********************************************************************************
    //  Attach Animation Toolbar To ContentBox Logic                                  //
    ///*********************************************************************************
    attachAnimationToolbar(activeContainer: HTMLElement) {
        animateable.attachAnimations();
        this.animationToolbar.style.display = "flex";
        this.animationToolbar.style.top = Number(activeContainer.getBoundingClientRect().top) - 90 + "px";
        this.animationToolbar.style.left = Number(activeContainer.getBoundingClientRect().left) - 30 + "px";
    }

    ///*********************************************************************************
    //  DeAttach NTextButtons To ContentBox Logic                                     //
    ///*********************************************************************************
    deAttachNTextButtons() {
        this.nTextButton.style.display = "none";
    }

    ///*********************************************************************************
    //  DeAttach Animation Toolbar From ContentBox Logic                             //
    ///*********************************************************************************
    deAttachAnimationToolbar() {
        this.animationToolbar.style.display = "none";
    }

    ///*********************************************************************************
    //  Attach EditImage To ContentBox Logic                                          //
    ///*********************************************************************************
    attachEditImageBtn(activeContainer: HTMLElement) {
        let editImageButton = this.nTextButton.querySelector('.custome-buttons');
        let image = activeContainer.querySelector("img");
        if (image.src.indexOf(".gif") == -1) {
            let editImage = document.createElement('a');
            editImage.classList.add('edit-image');
            editImage.setAttribute("data-toggle", "tooltip");
            editImage.setAttribute("data-placement", "left");
            editImage.setAttribute("title", "Edit Image");
            editImage.title = 'Edit Image';
            editImage.onclick = (event) => imageTools.showEditImage(event);
            editImage.insertAdjacentHTML('beforeend', `<img src="/Content/images/imageTools/edit.svg">`);
            editImageButton.appendChild(editImage);
            $('[data-toggle="tooltip"]').tooltip();
        }
    }

    ///*********************************************************************************
    //  Attach Sound Removal To ContentBox Logic                                          //
    ///*********************************************************************************
    attachSoundRemovalBtn(activeContainer: HTMLElement) {

        let customeButtons = this.nTextButton.querySelector('.custome-buttons');
        let soundData = this.activeContentBoxData.SoundData || null;
        let soundDiv = activeContainer.querySelector('div.soundDiv') || null;
        if (soundData || soundDiv) {
            let soundRemovalBtn = document.createElement('a');
            soundRemovalBtn.classList.add('remove-sound');
            soundRemovalBtn.setAttribute("data-toggle", "tooltip");
            soundRemovalBtn.setAttribute("data-placement", "left");
            soundRemovalBtn.setAttribute("title", "Remove Sound");
            soundRemovalBtn.title = 'Remove Sound';
            soundRemovalBtn.onclick = (event) => sound.removeSoundElement(this.activeContentBox,this.activeContentBoxData);
            soundRemovalBtn.insertAdjacentHTML('beforeend', `<img src="/Content/images/general/delete_audio.svg">`);
            customeButtons.appendChild(soundRemovalBtn);
            $('[data-toggle="tooltip"]').tooltip();
        }
    }


    ///*********************************************************************************
    // Restore Default NTextButtons                                                  //
    ///*********************************************************************************
    restoreDefaultButtons() {
        $('div.custome-buttons [data-toggle="tooltip"]').tooltip('hide');
        this.nTextButton.querySelector('.custome-buttons').innerHTML = "";
        $('[data-toggle="tooltip"]').tooltip();

    }


    ///*********************************************************************************
    //  Attach Core Function Logic                                                   //
    ///*********************************************************************************
    attachCoreLogic(event: any) {

        if (event.target.closest(".activeContainer")) {

            let activeContainer: HTMLElement = document.querySelector(".activeContainer");

            //** Detect ContentBox ContentType  **//
            this.getContentboxData(activeContainer);

            //** Remove Any Custome Buttons  **//
            this.restoreDefaultButtons();


            //** Apply Generic Logic **//
            //*************************//

            //** run Custome Logic on ContentBox before Attach Elements **//
            switch (this.activeBoxContentType) {
                case this.contentTypeEnum.image:
                    this.attachEditImageBtn(activeContainer);
                    this.attachSoundRemovalBtn(activeContainer);
                    break;
                case this.contentTypeEnum.video:
                    this.attachSoundRemovalBtn(activeContainer);
                    break;
                case this.contentTypeEnum.shape:
                    this.attachSoundRemovalBtn(activeContainer);
                    break;
                case this.contentTypeEnum.drawingSurface:
                    this.attachSoundRemovalBtn(activeContainer);
                    break;
                case this.contentTypeEnum.text:
                    this.attachSoundRemovalBtn(activeContainer);
                    break;
            }

            //**Add Your Custome Logic to Attach Element To contentBox Here ..... **//
            /////////////////////////////////////////////////////////////////////////

            //** Attach NText Buttons Logic **//
            this.attachNTextButtons(activeContainer);


            //** Animation Toolbar Logic **//
            this.attachAnimationToolbar(activeContainer);

        }
    }

    ///*********************************************************************************
    //  DeAttach Core Function Logic                                                   //
    ///*********************************************************************************
    deAttachCoreLogic() {
        //** DeAttach NText Buttons from ContentBox Logic **//
        this.deAttachNTextButtons();

        //**Add Your Custome Logic to DeAttach Element To contentBox Here..... **//
        this.deAttachAnimationToolbar();
    }


    ///*********************************************************************************
    //  Check Active Special Cases prevent DeAttach element                          //
    ///*********************************************************************************
    applySpecialBorderCases() {
        //** run Custome Logic on ContentBox before Attach Elements **//
        switch (this.activeBoxContentType) {
            case 0:
                break;
            case this.contentTypeEnum.drawingSurface:
                let isEmpty = (this.lastActiveConetntBox.dataset.isEmpty == "true");
                if (isEmpty) {
                    this.lastActiveConetntBox.classList.add("bordered");
                    break;
                }
            case this.contentTypeEnum.text:
                let content = (tinyMCE.activeEditor ? tinyMCE.activeEditor.getBody().textContent : true);
                if (!content) {
                    this.lastActiveConetntBox.classList.add("bordered");
                    break;
                }
            default:
                this.lastActiveConetntBox.classList.remove("bordered");
                break;
        }
    }

    ///*********************************************************************************
    //  Check Active Special Cases prevent DeAttach element                          //
    ///*********************************************************************************
    checkActiveSpecialCases(event: any) {
        let targetFound = false;
        this.specialActiveCases.forEach(function (selector) {
            if (event.target.closest(selector)) {
                targetFound = true;
            }
        }.bind(this));
        return targetFound;
    }


    ///*********************************************************************************
    //  ContentBox Activated Event Logic                                             //
    ///*********************************************************************************
    activeEventLogic(event: any, detailObject: any) {
        //** Activate Container on Current Target **//
        event.target.closest(".pres-newContainer").classList.add("activeContainer");

        //Setting ContentBox Data , ContentType From ActiveConetntBox
        this.getContentboxData(this.activeContentBox);

        //** Firing ContentBox Activeated Custom Event on Current ActiveConetntBox **//
        detailObject = {
            target: this.activeContentBox,
            contentType: this.activeBoxContentType,
            data: this.activeContentBoxData
        };
        this.createCustomeEvent(this.contentBoxActiveEvent, detailObject);

        //** set CrrentContainer As Last ActiveContainer **//
        this.lastActiveConetntBox = event.target.closest(".activeContainer");
    }

    ///*********************************************************************************
    //  ContentBox Blur Event Logic                                                  //
    ///*********************************************************************************
    blurEventLogic(detailObject: any) {

        //Setting ContentBox Data , ContentType From lastActiveConetntBox
        this.getContentboxData(this.lastActiveConetntBox);

        //** DeActivate Container on Last Target **//
        this.lastActiveConetntBox.classList.remove("activeContainer");

        //** Firing ContentBox blured Custom Event on lastActiveConetntBox **//
        detailObject = {
            target: this.lastActiveConetntBox,
            contentType: this.activeBoxContentType,
            data: this.activeContentBoxData
        };
        this.createCustomeEvent(this.contentBoxBluredEvent, detailObject);

        this.applySpecialBorderCases();
    }

    ///*********************************************************************************
    //  ContentBox Deleted Event Logic                                                //
    ///*********************************************************************************
    deleteEventLogic(detailObject: any) {
        //** Firing Blur Event //**
        this.blurEventLogic(detailObject);

        //** Firing ContentBox blured Custom Event on lastActiveConetntBox **//
        detailObject = {
            target: this.lastActiveConetntBox,
            contentType: this.activeBoxContentType,
            data: this.activeContentBoxData
        };
        this.createCustomeEvent(contentBoxCore.contentBoxDeletedEvent, detailObject);
        //** reset Prop **//
        this.activeContentBox = null;
        this.lastActiveConetntBox = null;
        this.activeBoxContentType = null;
        this.activeContentBoxData = null;
    }

    ///*********************************************************************************
    //  Send To Save Event Logic                                                     //
    ///*********************************************************************************
    sendToSave(detailObject: any) {
        //** Firing ContentBox blured Custom Event on lastActiveConetntBox **//
        detailObject = {
            target: this.activeContentBox,
            contentType: this.activeBoxContentType,
            data: this.activeContentBoxData
        };
        this.createCustomeEvent(this.contentBoxSendToSave, detailObject);
    }


    ///*********************************************************************************
    // Content Box FocusIn or FocusOut Event  Logic when (Click - Delete) Events      //
    ///*********************************************************************************
    // ** Hint:> this.activeContentBox Refer To Current ActiveBox **//
    // ** Hint:> this.lastActiveConetntBox ReferTo Previous ActiveBox when Current ActiveBox changed  **//
    // ** Hint:> this.lastActiveConetntBox ReferTo Current ActiveBox when current is same Previous **//
    contentBoxFocusEvents(event: any, detailObject: any) {
        //** ActiveBox Event Logic When press on ContenBox  *****************//
        //** Also prevent Active same Box when Click on it more than tinme **//
        if (event.target.closest(".pres-newContainer") && !event.target.closest(".activeContainer")) {

            this.activeContentBox = event.target.closest(".pres-newContainer");

            //**********************************************************************//
            //** Firing Blur Event When PreviousActiveBox is Not currentActiveBox **//
            if (this.lastActiveConetntBox && this.lastActiveConetntBox.id !== this.activeContentBox.id) {
                this.blurEventLogic(detailObject);
            }

            //**********************************************************************//
            //** Activate Container on Current Target *****************************//
            this.activeEventLogic(event, detailObject);

            //*************************************************************//
        }

        //** Firing Blur Event when press OutSide ContenBox **//
        else if (!event.target.closest(".pres-newContainer") && this.activeContentBox) {

            this.blurEventLogic(detailObject);
            //** reset Prop **//
            this.activeContentBox = null;
            this.activeBoxContentType = null;
            this.activeContentBoxData = null;
        }
    }


    ///*********************************************************************************
    // Attach Events To Apply logic                                                   //
    ///*********************************************************************************
    coreEvents() {
        let self = this;
        let mainContent = document.querySelector("#presMainContent");
        let detailObject: object;

        //**********************************************************************//
        //** Attach or DeAttach On Click Event Based On activeContainer Target **//
        document.addEventListener("click", function (e: any) {
            if (e.target.closest(".pres-newContainer")) {
                //** Run core Logic blured Content Box When Current target is active contentbox **//
                self.contentBoxFocusEvents(e, detailObject);

                //** Run core Logic For Attach Element To contentBox **//
                self.attachCoreLogic(e);
                return;
            }

            //** prevent Deattach on speacial Cases **//
            else if (self.checkActiveSpecialCases(e)) {
                return;
            }

            //** Deattach  **//
            else {
                //** Run core Logic For DeAttach Element from contentBox **//
                self.deAttachCoreLogic();

                //** Run core Logic blured Content Box When Current target is Not active contentbox **//
                self.contentBoxFocusEvents(e, detailObject);
            }

        }.bind(this), false);


        //*********************************************************************//
        //** Listen To custome Event any where To Run Core logic For Attaching Element To contentBox **//
        ["onCompleteContentBoxEffects"].forEach(function (e) {
            document.addEventListener(e, function (e: any) {
                self.attachCoreLogic(e.detail);
            }, false);
        });


        //*********************************************************************//
        //** Listen To custome Event From resizable & dragable Modules & delete contentbox custome event **//
        //** When Start Resize Or Drag To hide nTextButton untill finish Operations **//
        ["onStartDragContentbox", "onStartResizeContentbox", "onStartContentBoxEffects", "contentBoxDeleted"].forEach(function (e) {
            document.addEventListener(e, function (e: any) {
                self.deAttachCoreLogic();
            }, false);
        });

        //*********************************************************************//
        //** Apply Logic of contentBoxs Selection on MouseUp **//
        mainContent.addEventListener("mouseup", function (e: any) {
            self.ConetntBoxsSelection(e);
        });


        //********************************************************************//
        //** Apply Logic of contentBoxs Selection Operation [Copy - Cut - Del] with KyeUp **//
        window.addEventListener("keyup", function (e: any) {
            self.multiSelectOpeartions(e);
        });


        //********************************************************************//
        //** Listen To resize Window Event To Run Core logic For Attaching Element To contentBox**//
        window.addEventListener("resize", function (event: any) {
            let activebox = this.document.querySelector('.activeContainer');
            if (activebox) {
                self.attachCoreLogic({ target: activebox });
            }
        });
    }


    ///*********************************************************************************
    // ConetntBoxs Selection - De Selection mainFucntion logic                       //
    ///*********************************************************************************
    ConetntBoxsSelection(event: any) {
        //** MultiSelect **//
        let item = event.target.closest(".pres-newContainer");
        if (event.target.closest(".pres-newContainer") && !event.target.closest(".pres-newContainer").classList.contains("selected-contentbox") && (event.ctrlKey || event.metaKey)) {
            this.multiSelect(event);
        }
        //** DeSelect one item if Already Selected **//
        else if (event.target.closest(".pres-newContainer") && event.target.closest(".pres-newContainer").classList.contains("selected-contentbox") && (event.ctrlKey || event.metaKey)) {
            this.deSelect(event, item);
        }
        //**deSelectAll **//
        else {
            this.deSelect(event);
        }
    }


    ///*********************************************************************************
    // Multi Select ConetntBoxs logic                                                 //
    ///*********************************************************************************
    multiSelect(event: any) {
        //** multiSelect **//
        let contentBox = event.target.closest(".pres-newContainer");
        contentBox.classList.add("selected-contentbox");
    }


    ///*********************************************************************************
    // deSelect  ConetntBoxs logic                                                   //
    ///*********************************************************************************
    deSelect(event: any, selectedItems?: any) {
        //** deSelectAll **//
        selectedItems = selectedItems || document.querySelectorAll('.selected-contentbox');
        if (typeof (selectedItems.length) !== "undefined" && selectedItems.length > 0) {
            document.querySelectorAll('.selected-contentbox').forEach(function (elemnt) {
                elemnt.classList.remove('selected-contentbox');
            })
        }
        //** DeSelect one **//
        else if (typeof (selectedItems.length) == "undefined" && selectedItems) {
            selectedItems.classList.remove('selected-contentbox');
        }
    }


    ///*********************************************************************************
    // ConetntBoxs Opeartions With MultiSelected logic Like [Delete - Copy - Cut]     //
    ///*********************************************************************************
    multiSelectOpeartions(event: any) {
        //** Delete Logic with Del Key **//
        if (event.keyCode == 46) {
            let selectedItems = document.querySelectorAll('.selected-contentbox');
            let activeItemWithoutSelection = document.querySelectorAll('.activeContainer');
            //** Delete MultiContentBoxs With Selection Marker **//
            if (selectedItems.length > 1) {
                $("#myAlertModal div.modal-body p").html("are you sure you want to delete these content boxes?");
                $('#myAlertModal').modal('show');
                $('#myAlertModal div.modal-footer button.btn').on("click", function () {
                    let contentBoxs = document.querySelectorAll('.selected-contentbox');
                    copyPasteHelper.deleteContainer(contentBoxs);
                })
            }
            //** Delete Active ContentBox without Selection Marker **//
            else if (activeItemWithoutSelection.length == 1 && selectedItems.length <= 1) {
                copyPasteHelper.deleteContainer(activeItemWithoutSelection);
            }
            else {
                return;
            }
        }
        //** Deselect All when press Escape Button **//
        if (event.key === "Escape") {
            this.deSelect(event);
        }
    }


    ///*********************************************************************************
    //  Attach nTextButton Element First Time To ContentBox on The flay               //
    //  by adding it one time on every slide                                          //
    ///*********************************************************************************
    appendHtMlStringElements() {
        let activeSlide = document.querySelector("#page-content-wrapper");
        activeSlide.insertAdjacentHTML('beforeend', this.nTextButtonString);
        activeSlide.insertAdjacentHTML('beforeend', this.animationToolbarString);

        this.animationToolbar = document.querySelector('div.animation-toolbar');
        this.nTextButton = document.querySelector('div.NTextbutton');

        this.coreEvents();
    }
}

