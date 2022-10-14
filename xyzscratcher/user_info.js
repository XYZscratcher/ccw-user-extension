const extensionId = "xyzscratcher_user_info";

class XyzscratcherUserInfo {
	constructor(runtime) {
		this.runtime = runtime;
		this._formatMessage = runtime.getFormatMessage({
			"zh-cn": {
				
			},
			en: {
				
			}
		})
	}

	formatMessage(id) {
		return this._formatMessage({
			id,
			default: id,
			description: id
		});
	}

	getInfo() {
		return {
			id: extensionId, // 拓展id
			name: this.formatMessage(".name"), // 拓展名
			docsURI: "",
			blockIconURI: _icon,
			menuIconURI: _icon,
			color1: "#60D6F4",
			color2: "#55a7f7",
			blocks: [{
					opcode: "",
					blockType: "reporter",
					text: this.formatMessage(""),
					arguments: {
						text: {
							type: "string",
							defaultValue: 'awa!!!|awa!!!',
						},
						name: {
							type: "string",
							defaultValue: 'wit_cat.txt',
						},
						s: {
							type: "string",
							defaultValue: '|',
						},
					},
				},
				{
					opcode: "download",
					blockType: "command",
					text: this.formatMessage("WitCatFileHelper.download"),
					arguments: {
						text: {
							type: "string",
							defaultValue: 'awa!!!',
						},
						name: {
							type: "string",
							defaultValue: 'wit_cat.txt',
						},
					},
				},
				{
					opcode: "upload",
					blockType: "reporter",
					text: this.formatMessage("WitCatFileHelper.upload"),
					arguments: {
						name: {
							type: "string",
							defaultValue: 'i',
						},
					},
				},
				{
					opcode: "save",
					blockType: "command",
					text: this.formatMessage("WitCatFileHelper.save"),
					arguments: {
						text: {
							type: "string",
							defaultValue: '0',
						},
						name: {
							type: "string",
							defaultValue: 'i',
						},
					},
				},
				{
					opcode: "segmentation",
					blockType: "reporter",
					text: this.formatMessage("WitCatFileHelper.segmentation"),
					arguments: {
						text: {
							type: "string",
							defaultValue: 'wow/!!!',
						},
						s: {
							type: "string",
							defaultValue: '/',
						},
					},
				},
				{
					opcode: "delete",
					blockType: "command",
					text: this.formatMessage("WitCatFileHelper.delete"),
					arguments: {
						name: {
							type: "string",
							defaultValue: 'i',
						},
					},
				},
				{
					opcode: "encrypt",
					blockType: "reporter",
					text: this.formatMessage("WitCatFileHelper.encrypt"),
					arguments: {
						text: {
							type: "string",
							defaultValue: 'i love中国',
						},
					},
				},
				{
					opcode: "decrypt",
					blockType: "reporter",
					text: this.formatMessage("WitCatFileHelper.decrypt"),
					arguments: {
						text: {
							type: "string",
							defaultValue: 'aSUyMGxvdmUlRTQlQjglQUQlRTUlOUIlQkQ=',
						},
					},
				},
				{
					opcode: "openfile",
					blockType: "reporter",
					text: this.formatMessage("WitCatFileHelper.openfile"),
					arguments: {},
				},
			]
		};
	}
	//下载多行文件
	downloads(args) {
		let h = args.text;
		let text = args.text;
		const filename = args.name;
		let s = args.s;
		let j = 0;
		if (s != "") {
			let a = text.split(s);
			h = a[0];
			for (j = 1; j < a.length; j++) {
				h = h + "\n" + a[j];
			}
		} else {
			h = text;
		}
		const content = h;
		// 创建隐藏的可下载链接
		let eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		let blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	}
	//下载文件
	download(args) {
		const filename = args.name;
		const content = args.text;
		// 创建隐藏的可下载链接
		let eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		let blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	}
	//读取本地变量
	upload(args) {
		const name = args.name;
		let h = this.runtime.ccwAPI.getProjectUUID();
		return localStorage.getItem(h + name);
	}
	//保存本地变量
	save(args) {
		const text = args.text;
		const name = args.name;
		let h = this.runtime.ccwAPI.getProjectUUID();
		if(h == ""){
			alert("请先保存作品");
		} else{
			localStorage.setItem(h + name, text);
		}
	}
	//删除本地变量
	delete(args) {
		const name = args.name;
		let h = this.runtime.ccwAPI.getProjectUUID();
		localStorage.removeItem(h + name);
	}
	//字符串分割
	segmentation(args) {
		let text = args.text;
		let s = args.s;
		let array = text.split(s);
		const a = `","`;
		const b = `["`;
		const c = `"]`;
		let str = array.join(a);
		let r = b + str + c;
		return r;
	}
	//加密
	encrypt(args) {
		let str = args.text;
		let jiaMi = encodeURIComponent(str);
		let jiaM = btoa(jiaMi);
		return jiaM;
	}
	//解密
	decrypt(args) {
		let jiaM = args.text;
		let jieMi = atob(jiaM);
		let jieM = decodeURIComponent(jieMi);
		return jieM;
	}
	//打开文件
	openfile(args){
		return new Promise(resolve => {
			const input = document.createElement("input");
			input.type = "file";
			input.onchange = () => {
				const reader = new FileReader();
				const file = input.files[0];
				reader.onload = (e) => {
					resolve(e.target.result);
				};
				reader.onerror = (e) => {
					console.error(e);
					resolve();
				};
				reader.readAsText(file);
			}
			input.click();
		});
	}
}

window.tempExt = {
	Extension: WitCatFileHelper,
	info: {
		name: "WitCatFileHelper.name",
		description: "WitCatFileHelper.descp",
		extensionId: extensionId,
		iconURL: _picture,
		insetIconURL: _icon,
		featured: true,
		disabled: false,
		collaborator: "白猫 @ CCW"
	},
	l10n: {
		"zh-cn": {
			"WitCatFileHelper.name": "文件助手",
			"WitCatFileHelper.descp": "处理本地数据"
		},
		en: {
			"WitCatFileHelper.name": "File Helper",
			"WitCatFileHelper.descp": "Handling local data"
		}
	}
};
