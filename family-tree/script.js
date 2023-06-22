//JavaScript

FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate.size = [200, 200];
FamilyTree.templates.myTemplate.node =
    '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#aeaeae"></circle>';

FamilyTree.templates.myTemplate.defs = ``;

FamilyTree.templates.myTemplate.ripple = {
    radius: 100,
    color: "#e6e6e6",
    rect: null
};
FamilyTree.templates.myTemplate.img_0 =
    '<clipPath id="ulaImg">'
    + '<circle cx="100" cy="150" r="40"></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="60" y="110" width="80" height="80">'
    + '</image>';
FamilyTree.templates.myTemplate.field_0 = '<text style="font-size: 24px;" fill="#ffffff" x="100" y="90" text-anchor="middle">{val}</text>';
FamilyTree.templates.myTemplate.field_1 = '<text style="font-size: 16px;" fill="#ffffff" x="100" y="60" text-anchor="middle">{val}</text>';

FamilyTree.templates.myTemplate.link =
    '<path stroke="#686868" stroke-width="1px" fill="none" data-l-id="[{id}][{child-id}]" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';

FamilyTree.templates.myTemplate.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">'
    + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
    + '</rect>'
    + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '</g>';

FamilyTree.templates.myTemplate.menuButton =
    '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" data-ctrl-menu="">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '</div>';

FamilyTree.templates.myTemplate.pointer =
    '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">'
    + '<polygon fill="rgb(255, 202, 40)" points="53.004,173.004 53.004,66.996 0,120" />'
    + '<polygon fill="rgb(255, 202, 40)" points="186.996,66.996 186.996,173.004 240,120" />'
    + '<polygon fill="rgb(255, 202, 40)" points="66.996,53.004 173.004,53.004 120,0" />'
    + '<polygon fill="rgb(255, 202, 40)" points="120,240 173.004,186.996 66.996,186.996" />'
    + '<circle fill="rgb(255, 202, 40)" cx="120" cy="120" r="30" />'
    + '</g></g>';

FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_male.node = '<circle cx="100" cy="100" r="100" fill="#039be5" stroke-width="1" stroke="#aeaeae"></circle>';
FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_female.node = '<circle cx="100" cy="100" r="100" fill="#FF46A3" stroke-width="1" stroke="#aeaeae"></circle>';

FamilyTree.elements.textarea = function (data, editElement, minWidth, readOnly) {
    var id = FamilyTree.elements.generateId();
    var value = data[editElement.binding];
    if (value == undefined) value = '';
    if (readOnly && !value) {
        return {
            html: ''
        };
    }
    var rOnlyAttr = readOnly ? 'readonly' : '';
    var rDisabledAttr = readOnly ? 'disabled' : '';
    return {
        html: `<textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" style="width: 100%;height: 200px;" data-binding="${editElement.binding}">${value}</textarea>`,
        id: id,
        value: value
    };

};

var family = new FamilyTree(document.getElementById("tree"), {
    mouseScrool: FamilyTree.action.ctrlZoom,
    template: "hugo",
    enableSearch: true,
    nodeBinding: {
        field_0: "name",
        // field_1: "phone",
        img_0: "photo"
    },
    nodeMenu: {
        details: { text: "Details" },
    },
    editForm: {
        titleBinding: "name",
        photoBinding: "photo",
        generateElementsFromFields: false,
        addMore: 'Add more elements',
        addMoreBtn: 'Add element',
        addMoreFieldName: 'Element name',
        elements: [
            { type: 'textbox', label: 'Full Name', binding: 'name' },
            [
                { type: 'date', label: 'Birth Date', binding: 'birthDate' },
                { type: 'date', label: 'Wedding Date', binding: 'wedDate' },
                { type: 'date', label: 'Death Date', binding: 'deathDate' }
            ],
            { type: 'textbox', label: 'Phone', binding: 'phone' },
            { type: 'textbox', label: 'City', binding: 'city' },
            { type: 'textbox', label: 'Address', binding: 'address' },
            { type: 'textarea', label: 'Other Details', binding: 'otherDetails' },
        ],
        buttons: {
            edit: {
                icon: FamilyTree.icon.edit(24, 24, '#fff'),
                text: 'Edit',
                hideIfEditMode: true,
                hideIfDetailsMode: true
            },
            share: {
                icon: FamilyTree.icon.share(24, 24, '#fff'),
                text: 'Share',
                hideIfEditMode: true,
                hideIfDetailsMode: true
            },
            pdf: {
                icon: FamilyTree.icon.pdf(24, 24, '#fff'),
                text: 'Save as PDF'
            },
            remove: null
        }
    },
    menu: {
        pdf: { text: "Export PDF" },
        png: { text: "Export PNG" },
        svg: { text: "Export SVG" },
        csv: { text: "Export CSV" }
    },
});

fetch("family-tree/data.json")
    .then((response) => response.json())
    .then((json) => family.load(json));


family.on('expcollclick', function (sender, isCollapsing, nodeId) {
    var node = family.getNode(nodeId);
    if (isCollapsing) {
        family.expandCollapse(nodeId, [], node.ftChildrenIds)
    }
    else {
        family.expandCollapse(nodeId, node.ftChildrenIds, [])
    }
    return false;
});

family.on('render-link', function (sender, args) {
    var cnodeData = family.get(args.cnode.id);
    var nodeData = family.get(args.node.id);
    if (cnodeData.divorced != undefined && nodeData.divorced != undefined &&
        cnodeData.divorced.includes(args.node.id) && nodeData.divorced.includes(args.cnode.id)) {
        console.log(args.html);
        args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
    }
});