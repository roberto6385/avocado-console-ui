// source: sftp.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.proto.sftp.AttributesResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeDirectoryRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeDirectoryResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeGroupRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeGroupResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeModeRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeModeResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeModifyTimeRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeModifyTimeResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeOwnerRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ChangeOwnerResponse', null, global);
goog.exportSymbol('proto.proto.sftp.CommandRequest', null, global);
goog.exportSymbol('proto.proto.sftp.CommandRequest.CommandCase', null, global);
goog.exportSymbol('proto.proto.sftp.CommandResponse', null, global);
goog.exportSymbol('proto.proto.sftp.CommandResponse.CommandCase', null, global);
goog.exportSymbol('proto.proto.sftp.ConnectRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ConnectResponse', null, global);
goog.exportSymbol('proto.proto.sftp.DisconnectRequest', null, global);
goog.exportSymbol('proto.proto.sftp.DisconnectResponse', null, global);
goog.exportSymbol('proto.proto.sftp.EntryResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ErrorResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ExitRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ExitResponse', null, global);
goog.exportSymbol('proto.proto.sftp.GetRequest', null, global);
goog.exportSymbol('proto.proto.sftp.GetRequest.Mode', null, global);
goog.exportSymbol('proto.proto.sftp.GetResponse', null, global);
goog.exportSymbol('proto.proto.sftp.LinkStatusRequest', null, global);
goog.exportSymbol('proto.proto.sftp.LinkStatusResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ListDirectoryRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ListDirectoryResponse', null, global);
goog.exportSymbol('proto.proto.sftp.MakeDirectoryRequest', null, global);
goog.exportSymbol('proto.proto.sftp.MakeDirectoryResponse', null, global);
goog.exportSymbol('proto.proto.sftp.Message', null, global);
goog.exportSymbol('proto.proto.sftp.Message.TypeCase', null, global);
goog.exportSymbol(
	'proto.proto.sftp.PrintWorkingDirectoryRequest',
	null,
	global,
);
goog.exportSymbol(
	'proto.proto.sftp.PrintWorkingDirectoryResponse',
	null,
	global,
);
goog.exportSymbol('proto.proto.sftp.PutRequest', null, global);
goog.exportSymbol('proto.proto.sftp.PutRequest.Mode', null, global);
goog.exportSymbol('proto.proto.sftp.PutResponse', null, global);
goog.exportSymbol('proto.proto.sftp.QuitRequest', null, global);
goog.exportSymbol('proto.proto.sftp.QuitResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ReadFileRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ReadFileResponse', null, global);
goog.exportSymbol('proto.proto.sftp.ReadLinkRequest', null, global);
goog.exportSymbol('proto.proto.sftp.ReadLinkResponse', null, global);
goog.exportSymbol('proto.proto.sftp.RemoveDirectoryRequest', null, global);
goog.exportSymbol('proto.proto.sftp.RemoveDirectoryResponse', null, global);
goog.exportSymbol('proto.proto.sftp.RemoveFileRequest', null, global);
goog.exportSymbol('proto.proto.sftp.RemoveFileResponse', null, global);
goog.exportSymbol('proto.proto.sftp.RenameRequest', null, global);
goog.exportSymbol('proto.proto.sftp.RenameResponse', null, global);
goog.exportSymbol('proto.proto.sftp.Request', null, global);
goog.exportSymbol('proto.proto.sftp.Request.RequestCase', null, global);
goog.exportSymbol('proto.proto.sftp.Response', null, global);
goog.exportSymbol('proto.proto.sftp.Response.ResponseCase', null, global);
goog.exportSymbol('proto.proto.sftp.Response.Status', null, global);
goog.exportSymbol('proto.proto.sftp.StatusRequest', null, global);
goog.exportSymbol('proto.proto.sftp.StatusResponse', null, global);
goog.exportSymbol('proto.proto.sftp.SymbolicLinkRequest', null, global);
goog.exportSymbol('proto.proto.sftp.SymbolicLinkResponse', null, global);
goog.exportSymbol(
	'proto.proto.sftp.VirtualFileSystemStatusRequest',
	null,
	global,
);
goog.exportSymbol(
	'proto.proto.sftp.VirtualFileSystemStatusResponse',
	null,
	global,
);
goog.exportSymbol('proto.proto.sftp.WriteFileRequest', null, global);
goog.exportSymbol('proto.proto.sftp.WriteFileRequest.Mode', null, global);
goog.exportSymbol('proto.proto.sftp.WriteFileResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.Message = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		null,
		proto.proto.sftp.Message.oneofGroups_,
	);
};
goog.inherits(proto.proto.sftp.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.Message.displayName = 'proto.proto.sftp.Message';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.Request = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		null,
		proto.proto.sftp.Request.oneofGroups_,
	);
};
goog.inherits(proto.proto.sftp.Request, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.Request.displayName = 'proto.proto.sftp.Request';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ConnectRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ConnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ConnectRequest.displayName =
		'proto.proto.sftp.ConnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.DisconnectRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.DisconnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.DisconnectRequest.displayName =
		'proto.proto.sftp.DisconnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.CommandRequest = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		null,
		proto.proto.sftp.CommandRequest.oneofGroups_,
	);
};
goog.inherits(proto.proto.sftp.CommandRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.CommandRequest.displayName =
		'proto.proto.sftp.CommandRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeDirectoryRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeDirectoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeDirectoryRequest.displayName =
		'proto.proto.sftp.ChangeDirectoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.PrintWorkingDirectoryRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.PrintWorkingDirectoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.PrintWorkingDirectoryRequest.displayName =
		'proto.proto.sftp.PrintWorkingDirectoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeGroupRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeGroupRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeGroupRequest.displayName =
		'proto.proto.sftp.ChangeGroupRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeOwnerRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeOwnerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeOwnerRequest.displayName =
		'proto.proto.sftp.ChangeOwnerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeModeRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeModeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeModeRequest.displayName =
		'proto.proto.sftp.ChangeModeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeModifyTimeRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeModifyTimeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeModifyTimeRequest.displayName =
		'proto.proto.sftp.ChangeModifyTimeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.MakeDirectoryRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.MakeDirectoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.MakeDirectoryRequest.displayName =
		'proto.proto.sftp.MakeDirectoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RemoveDirectoryRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RemoveDirectoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RemoveDirectoryRequest.displayName =
		'proto.proto.sftp.RemoveDirectoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RemoveFileRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RemoveFileRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RemoveFileRequest.displayName =
		'proto.proto.sftp.RemoveFileRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RenameRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RenameRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RenameRequest.displayName =
		'proto.proto.sftp.RenameRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.SymbolicLinkRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.SymbolicLinkRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.SymbolicLinkRequest.displayName =
		'proto.proto.sftp.SymbolicLinkRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ListDirectoryRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ListDirectoryRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ListDirectoryRequest.displayName =
		'proto.proto.sftp.ListDirectoryRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.StatusRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.StatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.StatusRequest.displayName =
		'proto.proto.sftp.StatusRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.LinkStatusRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.LinkStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.LinkStatusRequest.displayName =
		'proto.proto.sftp.LinkStatusRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.VirtualFileSystemStatusRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.VirtualFileSystemStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.VirtualFileSystemStatusRequest.displayName =
		'proto.proto.sftp.VirtualFileSystemStatusRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ReadLinkRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ReadLinkRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ReadLinkRequest.displayName =
		'proto.proto.sftp.ReadLinkRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.PutRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.PutRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.PutRequest.displayName = 'proto.proto.sftp.PutRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.GetRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.GetRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.GetRequest.displayName = 'proto.proto.sftp.GetRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ReadFileRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ReadFileRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ReadFileRequest.displayName =
		'proto.proto.sftp.ReadFileRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.WriteFileRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.WriteFileRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.WriteFileRequest.displayName =
		'proto.proto.sftp.WriteFileRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ExitRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ExitRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ExitRequest.displayName = 'proto.proto.sftp.ExitRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.QuitRequest = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.QuitRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.QuitRequest.displayName = 'proto.proto.sftp.QuitRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.Response = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		null,
		proto.proto.sftp.Response.oneofGroups_,
	);
};
goog.inherits(proto.proto.sftp.Response, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.Response.displayName = 'proto.proto.sftp.Response';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ConnectResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ConnectResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ConnectResponse.displayName =
		'proto.proto.sftp.ConnectResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.DisconnectResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.DisconnectResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.DisconnectResponse.displayName =
		'proto.proto.sftp.DisconnectResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.CommandResponse = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		null,
		proto.proto.sftp.CommandResponse.oneofGroups_,
	);
};
goog.inherits(proto.proto.sftp.CommandResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.CommandResponse.displayName =
		'proto.proto.sftp.CommandResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeDirectoryResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeDirectoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeDirectoryResponse.displayName =
		'proto.proto.sftp.ChangeDirectoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.PrintWorkingDirectoryResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.PrintWorkingDirectoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.PrintWorkingDirectoryResponse.displayName =
		'proto.proto.sftp.PrintWorkingDirectoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeGroupResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeGroupResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeGroupResponse.displayName =
		'proto.proto.sftp.ChangeGroupResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeOwnerResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeOwnerResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeOwnerResponse.displayName =
		'proto.proto.sftp.ChangeOwnerResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeModeResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeModeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeModeResponse.displayName =
		'proto.proto.sftp.ChangeModeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ChangeModifyTimeResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ChangeModifyTimeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ChangeModifyTimeResponse.displayName =
		'proto.proto.sftp.ChangeModifyTimeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.MakeDirectoryResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.MakeDirectoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.MakeDirectoryResponse.displayName =
		'proto.proto.sftp.MakeDirectoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RemoveDirectoryResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RemoveDirectoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RemoveDirectoryResponse.displayName =
		'proto.proto.sftp.RemoveDirectoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RemoveFileResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RemoveFileResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RemoveFileResponse.displayName =
		'proto.proto.sftp.RemoveFileResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.RenameResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.RenameResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.RenameResponse.displayName =
		'proto.proto.sftp.RenameResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.SymbolicLinkResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.SymbolicLinkResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.SymbolicLinkResponse.displayName =
		'proto.proto.sftp.SymbolicLinkResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ListDirectoryResponse = function (opt_data) {
	jspb.Message.initialize(
		this,
		opt_data,
		0,
		-1,
		proto.proto.sftp.ListDirectoryResponse.repeatedFields_,
		null,
	);
};
goog.inherits(proto.proto.sftp.ListDirectoryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ListDirectoryResponse.displayName =
		'proto.proto.sftp.ListDirectoryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.EntryResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.EntryResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.EntryResponse.displayName =
		'proto.proto.sftp.EntryResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.StatusResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.StatusResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.StatusResponse.displayName =
		'proto.proto.sftp.StatusResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.LinkStatusResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.LinkStatusResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.LinkStatusResponse.displayName =
		'proto.proto.sftp.LinkStatusResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.AttributesResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.AttributesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.AttributesResponse.displayName =
		'proto.proto.sftp.AttributesResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.VirtualFileSystemStatusResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.VirtualFileSystemStatusResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.VirtualFileSystemStatusResponse.displayName =
		'proto.proto.sftp.VirtualFileSystemStatusResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ReadLinkResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ReadLinkResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ReadLinkResponse.displayName =
		'proto.proto.sftp.ReadLinkResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.PutResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.PutResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.PutResponse.displayName = 'proto.proto.sftp.PutResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.GetResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.GetResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.GetResponse.displayName = 'proto.proto.sftp.GetResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ReadFileResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ReadFileResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ReadFileResponse.displayName =
		'proto.proto.sftp.ReadFileResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.WriteFileResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.WriteFileResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.WriteFileResponse.displayName =
		'proto.proto.sftp.WriteFileResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ExitResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ExitResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ExitResponse.displayName = 'proto.proto.sftp.ExitResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.QuitResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.QuitResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.QuitResponse.displayName = 'proto.proto.sftp.QuitResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial resourceGroupId array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in placeholder and becomes part of the constructed object. It is not cloned.
 * If no resourceGroupId is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.sftp.ErrorResponse = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.sftp.ErrorResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.proto.sftp.ErrorResponse.displayName =
		'proto.proto.sftp.ErrorResponse';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.proto.sftp.Message.oneofGroups_ = [[1, 2]];

/**
 * @enum {number}
 */
proto.proto.sftp.Message.TypeCase = {
	TYPE_NOT_SET: 0,
	REQUEST: 1,
	RESPONSE: 2,
};

/**
 * @return {proto.proto.sftp.Message.TypeCase}
 */
proto.proto.sftp.Message.prototype.getTypeCase = function () {
	return /** @type {proto.proto.sftp.Message.TypeCase} */ (
		jspb.Message.computeOneofCase(
			this,
			proto.proto.sftp.Message.oneofGroups_[0],
		)
	);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.Message.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.Message.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.Message} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.Message.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				request:
					(f = msg.getRequest()) &&
					proto.proto.sftp.Request.toObject(includeInstance, f),
				response:
					(f = msg.getResponse()) &&
					proto.proto.sftp.Response.toObject(includeInstance, f),
				version: jspb.Message.getFieldWithDefault(msg, 3, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.Message}
 */
proto.proto.sftp.Message.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.Message();
	return proto.proto.sftp.Message.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.Message}
 */
proto.proto.sftp.Message.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.Request();
				reader.readMessage(
					value,
					proto.proto.sftp.Request.deserializeBinaryFromReader,
				);
				msg.setRequest(value);
				break;
			case 2:
				var value = new proto.proto.sftp.Response();
				reader.readMessage(
					value,
					proto.proto.sftp.Response.deserializeBinaryFromReader,
				);
				msg.setResponse(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setVersion(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.Message.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.Message.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.Message} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.Message.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getRequest();
	if (f != null) {
		writer.writeMessage(
			1,
			f,
			proto.proto.sftp.Request.serializeBinaryToWriter,
		);
	}
	f = message.getResponse();
	if (f != null) {
		writer.writeMessage(
			2,
			f,
			proto.proto.sftp.Response.serializeBinaryToWriter,
		);
	}
	f = message.getVersion();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
};

/**
 * optional Request request = 1;
 * @return {?proto.proto.sftp.Request}
 */
proto.proto.sftp.Message.prototype.getRequest = function () {
	return /** @type{?proto.proto.sftp.Request} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.Request, 1)
	);
};

/**
 * @param {?proto.proto.sftp.Request|undefined} value
 * @return {!proto.proto.sftp.Message} returns this
 */
proto.proto.sftp.Message.prototype.setRequest = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		1,
		proto.proto.sftp.Message.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Message} returns this
 */
proto.proto.sftp.Message.prototype.clearRequest = function () {
	return this.setRequest(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Message.prototype.hasRequest = function () {
	return jspb.Message.getField(this, 1) != null;
};

/**
 * optional Response response = 2;
 * @return {?proto.proto.sftp.Response}
 */
proto.proto.sftp.Message.prototype.getResponse = function () {
	return /** @type{?proto.proto.sftp.Response} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.Response, 2)
	);
};

/**
 * @param {?proto.proto.sftp.Response|undefined} value
 * @return {!proto.proto.sftp.Message} returns this
 */
proto.proto.sftp.Message.prototype.setResponse = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		2,
		proto.proto.sftp.Message.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Message} returns this
 */
proto.proto.sftp.Message.prototype.clearResponse = function () {
	return this.setResponse(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Message.prototype.hasResponse = function () {
	return jspb.Message.getField(this, 2) != null;
};

/**
 * optional string version = 3;
 * @return {string}
 */
proto.proto.sftp.Message.prototype.getVersion = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.Message} returns this
 */
proto.proto.sftp.Message.prototype.setVersion = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.proto.sftp.Request.oneofGroups_ = [[1, 2, 3]];

/**
 * @enum {number}
 */
proto.proto.sftp.Request.RequestCase = {
	REQUEST_NOT_SET: 0,
	CONNECT: 1,
	DISCONNECT: 2,
	COMMAND: 3,
};

/**
 * @return {proto.proto.sftp.Request.RequestCase}
 */
proto.proto.sftp.Request.prototype.getRequestCase = function () {
	return /** @type {proto.proto.sftp.Request.RequestCase} */ (
		jspb.Message.computeOneofCase(
			this,
			proto.proto.sftp.Request.oneofGroups_[0],
		)
	);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.Request.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.Request.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.Request} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.Request.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				connect:
					(f = msg.getConnect()) &&
					proto.proto.sftp.ConnectRequest.toObject(
						includeInstance,
						f,
					),
				disconnect:
					(f = msg.getDisconnect()) &&
					proto.proto.sftp.DisconnectRequest.toObject(
						includeInstance,
						f,
					),
				command:
					(f = msg.getCommand()) &&
					proto.proto.sftp.CommandRequest.toObject(
						includeInstance,
						f,
					),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.Request}
 */
proto.proto.sftp.Request.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.Request();
	return proto.proto.sftp.Request.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.Request} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.Request}
 */
proto.proto.sftp.Request.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.ConnectRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ConnectRequest.deserializeBinaryFromReader,
				);
				msg.setConnect(value);
				break;
			case 2:
				var value = new proto.proto.sftp.DisconnectRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.DisconnectRequest
						.deserializeBinaryFromReader,
				);
				msg.setDisconnect(value);
				break;
			case 3:
				var value = new proto.proto.sftp.CommandRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.CommandRequest.deserializeBinaryFromReader,
				);
				msg.setCommand(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.Request.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.Request.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.Request} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.Request.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getConnect();
	if (f != null) {
		writer.writeMessage(
			1,
			f,
			proto.proto.sftp.ConnectRequest.serializeBinaryToWriter,
		);
	}
	f = message.getDisconnect();
	if (f != null) {
		writer.writeMessage(
			2,
			f,
			proto.proto.sftp.DisconnectRequest.serializeBinaryToWriter,
		);
	}
	f = message.getCommand();
	if (f != null) {
		writer.writeMessage(
			3,
			f,
			proto.proto.sftp.CommandRequest.serializeBinaryToWriter,
		);
	}
};

/**
 * optional ConnectRequest connect = 1;
 * @return {?proto.proto.sftp.ConnectRequest}
 */
proto.proto.sftp.Request.prototype.getConnect = function () {
	return /** @type{?proto.proto.sftp.ConnectRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ConnectRequest, 1)
	);
};

/**
 * @param {?proto.proto.sftp.ConnectRequest|undefined} value
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.setConnect = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		1,
		proto.proto.sftp.Request.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.clearConnect = function () {
	return this.setConnect(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Request.prototype.hasConnect = function () {
	return jspb.Message.getField(this, 1) != null;
};

/**
 * optional DisconnectRequest disconnect = 2;
 * @return {?proto.proto.sftp.DisconnectRequest}
 */
proto.proto.sftp.Request.prototype.getDisconnect = function () {
	return /** @type{?proto.proto.sftp.DisconnectRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.DisconnectRequest,
			2,
		)
	);
};

/**
 * @param {?proto.proto.sftp.DisconnectRequest|undefined} value
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.setDisconnect = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		2,
		proto.proto.sftp.Request.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.clearDisconnect = function () {
	return this.setDisconnect(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Request.prototype.hasDisconnect = function () {
	return jspb.Message.getField(this, 2) != null;
};

/**
 * optional CommandRequest command = 3;
 * @return {?proto.proto.sftp.CommandRequest}
 */
proto.proto.sftp.Request.prototype.getCommand = function () {
	return /** @type{?proto.proto.sftp.CommandRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.CommandRequest, 3)
	);
};

/**
 * @param {?proto.proto.sftp.CommandRequest|undefined} value
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.setCommand = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		3,
		proto.proto.sftp.Request.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Request} returns this
 */
proto.proto.sftp.Request.prototype.clearCommand = function () {
	return this.setCommand(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Request.prototype.hasCommand = function () {
	return jspb.Message.getField(this, 3) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ConnectRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ConnectRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ConnectRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ConnectRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				token: jspb.Message.getFieldWithDefault(msg, 1, ''),
				host: jspb.Message.getFieldWithDefault(msg, 2, ''),
				user: jspb.Message.getFieldWithDefault(msg, 3, ''),
				password: jspb.Message.getFieldWithDefault(msg, 4, ''),
				port: jspb.Message.getFieldWithDefault(msg, 5, 0),
				serverid: jspb.Message.getFieldWithDefault(msg, 6, ''),
				keepalivecount: jspb.Message.getFieldWithDefault(msg, 7, 0),
				keepaliveinterval: jspb.Message.getFieldWithDefault(msg, 8, 0),
				bastionusername: jspb.Message.getFieldWithDefault(msg, 13, ''),
				bastionpassword: jspb.Message.getFieldWithDefault(msg, 14, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ConnectRequest}
 */
proto.proto.sftp.ConnectRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ConnectRequest();
	return proto.proto.sftp.ConnectRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ConnectRequest}
 */
proto.proto.sftp.ConnectRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setToken(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setHost(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setUser(value);
				break;
			case 4:
				var value = /** @type {string} */ (reader.readString());
				msg.setPassword(value);
				break;
			case 5:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setPort(value);
				break;
			case 6:
				var value = /** @type {string} */ (reader.readString());
				msg.setServerid(value);
				break;
			case 7:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setKeepalivecount(value);
				break;
			case 8:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setKeepaliveinterval(value);
				break;
			case 13:
				var value = /** @type {string} */ (reader.readString());
				msg.setBastionusername(value);
				break;
			case 14:
				var value = /** @type {string} */ (reader.readString());
				msg.setBastionpassword(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ConnectRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ConnectRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ConnectRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getToken();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getHost();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getUser();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
	f = message.getPassword();
	if (f.length > 0) {
		writer.writeString(4, f);
	}
	f = message.getPort();
	if (f !== 0) {
		writer.writeInt32(5, f);
	}
	f = message.getServerid();
	if (f.length > 0) {
		writer.writeString(6, f);
	}
	f = message.getKeepalivecount();
	if (f !== 0) {
		writer.writeInt32(7, f);
	}
	f = message.getKeepaliveinterval();
	if (f !== 0) {
		writer.writeInt32(8, f);
	}
	f = message.getBastionusername();
	if (f.length > 0) {
		writer.writeString(13, f);
	}
	f = message.getBastionpassword();
	if (f.length > 0) {
		writer.writeString(14, f);
	}
};

/**
 * optional string token = 1;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getToken = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setToken = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string host = 2;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getHost = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setHost = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string user = 3;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getUser = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setUser = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string password = 4;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getPassword = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 4, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setPassword = function (value) {
	return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * optional int32 port = 5;
 * @return {number}
 */
proto.proto.sftp.ConnectRequest.prototype.getPort = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setPort = function (value) {
	return jspb.Message.setProto3IntField(this, 5, value);
};

/**
 * optional string serverId = 6;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getServerid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 6, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setServerid = function (value) {
	return jspb.Message.setProto3StringField(this, 6, value);
};

/**
 * optional int32 keepAliveCount = 7;
 * @return {number}
 */
proto.proto.sftp.ConnectRequest.prototype.getKeepalivecount = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setKeepalivecount = function (value) {
	return jspb.Message.setProto3IntField(this, 7, value);
};

/**
 * optional int32 keepAliveInterval = 8;
 * @return {number}
 */
proto.proto.sftp.ConnectRequest.prototype.getKeepaliveinterval = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setKeepaliveinterval = function (
	value,
) {
	return jspb.Message.setProto3IntField(this, 8, value);
};

/**
 * optional string bastionUsername = 13;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getBastionusername = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 13, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setBastionusername = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 13, value);
};

/**
 * optional string bastionPassword = 14;
 * @return {string}
 */
proto.proto.sftp.ConnectRequest.prototype.getBastionpassword = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 14, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectRequest} returns this
 */
proto.proto.sftp.ConnectRequest.prototype.setBastionpassword = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 14, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.DisconnectRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.DisconnectRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.DisconnectRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.DisconnectRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				uuid: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.DisconnectRequest}
 */
proto.proto.sftp.DisconnectRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.DisconnectRequest();
	return proto.proto.sftp.DisconnectRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.DisconnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.DisconnectRequest}
 */
proto.proto.sftp.DisconnectRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setUuid(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.DisconnectRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.DisconnectRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.DisconnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.DisconnectRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getUuid();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string uuid = 1;
 * @return {string}
 */
proto.proto.sftp.DisconnectRequest.prototype.getUuid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.DisconnectRequest} returns this
 */
proto.proto.sftp.DisconnectRequest.prototype.setUuid = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.proto.sftp.CommandRequest.oneofGroups_ = [
	[
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23,
	],
];

/**
 * @enum {number}
 */
proto.proto.sftp.CommandRequest.CommandCase = {
	COMMAND_NOT_SET: 0,
	CD: 2,
	PWD: 3,
	CHGRP: 4,
	CHOWN: 5,
	CHMOD: 6,
	CHMTIME: 7,
	MKDIR: 8,
	RMDIR: 9,
	RM: 10,
	RENAME: 11,
	LN: 12,
	LS: 13,
	STAT: 14,
	LSTAT: 15,
	STATVFS: 16,
	READLINK: 17,
	PUT: 18,
	GET: 19,
	READFILE: 20,
	WRITEFILE: 21,
	EXIT: 22,
	QUIT: 23,
};

/**
 * @return {proto.proto.sftp.CommandRequest.CommandCase}
 */
proto.proto.sftp.CommandRequest.prototype.getCommandCase = function () {
	return /** @type {proto.proto.sftp.CommandRequest.CommandCase} */ (
		jspb.Message.computeOneofCase(
			this,
			proto.proto.sftp.CommandRequest.oneofGroups_[0],
		)
	);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.CommandRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.CommandRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.CommandRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.CommandRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				cd:
					(f = msg.getCd()) &&
					proto.proto.sftp.ChangeDirectoryRequest.toObject(
						includeInstance,
						f,
					),
				pwd:
					(f = msg.getPwd()) &&
					proto.proto.sftp.PrintWorkingDirectoryRequest.toObject(
						includeInstance,
						f,
					),
				chgrp:
					(f = msg.getChgrp()) &&
					proto.proto.sftp.ChangeGroupRequest.toObject(
						includeInstance,
						f,
					),
				chown:
					(f = msg.getChown()) &&
					proto.proto.sftp.ChangeOwnerRequest.toObject(
						includeInstance,
						f,
					),
				chmod:
					(f = msg.getChmod()) &&
					proto.proto.sftp.ChangeModeRequest.toObject(
						includeInstance,
						f,
					),
				chmtime:
					(f = msg.getChmtime()) &&
					proto.proto.sftp.ChangeModifyTimeRequest.toObject(
						includeInstance,
						f,
					),
				mkdir:
					(f = msg.getMkdir()) &&
					proto.proto.sftp.MakeDirectoryRequest.toObject(
						includeInstance,
						f,
					),
				rmdir:
					(f = msg.getRmdir()) &&
					proto.proto.sftp.RemoveDirectoryRequest.toObject(
						includeInstance,
						f,
					),
				rm:
					(f = msg.getRm()) &&
					proto.proto.sftp.RemoveFileRequest.toObject(
						includeInstance,
						f,
					),
				rename:
					(f = msg.getRename()) &&
					proto.proto.sftp.RenameRequest.toObject(includeInstance, f),
				ln:
					(f = msg.getLn()) &&
					proto.proto.sftp.SymbolicLinkRequest.toObject(
						includeInstance,
						f,
					),
				ls:
					(f = msg.getLs()) &&
					proto.proto.sftp.ListDirectoryRequest.toObject(
						includeInstance,
						f,
					),
				stat:
					(f = msg.getStat()) &&
					proto.proto.sftp.StatusRequest.toObject(includeInstance, f),
				lstat:
					(f = msg.getLstat()) &&
					proto.proto.sftp.LinkStatusRequest.toObject(
						includeInstance,
						f,
					),
				statvfs:
					(f = msg.getStatvfs()) &&
					proto.proto.sftp.VirtualFileSystemStatusRequest.toObject(
						includeInstance,
						f,
					),
				readlink:
					(f = msg.getReadlink()) &&
					proto.proto.sftp.ReadLinkRequest.toObject(
						includeInstance,
						f,
					),
				put:
					(f = msg.getPut()) &&
					proto.proto.sftp.PutRequest.toObject(includeInstance, f),
				get:
					(f = msg.getGet()) &&
					proto.proto.sftp.GetRequest.toObject(includeInstance, f),
				readfile:
					(f = msg.getReadfile()) &&
					proto.proto.sftp.ReadFileRequest.toObject(
						includeInstance,
						f,
					),
				writefile:
					(f = msg.getWritefile()) &&
					proto.proto.sftp.WriteFileRequest.toObject(
						includeInstance,
						f,
					),
				exit:
					(f = msg.getExit()) &&
					proto.proto.sftp.ExitRequest.toObject(includeInstance, f),
				quit:
					(f = msg.getQuit()) &&
					proto.proto.sftp.QuitRequest.toObject(includeInstance, f),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.CommandRequest}
 */
proto.proto.sftp.CommandRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.CommandRequest();
	return proto.proto.sftp.CommandRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.CommandRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.CommandRequest}
 */
proto.proto.sftp.CommandRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 2:
				var value = new proto.proto.sftp.ChangeDirectoryRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeDirectoryRequest
						.deserializeBinaryFromReader,
				);
				msg.setCd(value);
				break;
			case 3:
				var value = new proto.proto.sftp.PrintWorkingDirectoryRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.PrintWorkingDirectoryRequest
						.deserializeBinaryFromReader,
				);
				msg.setPwd(value);
				break;
			case 4:
				var value = new proto.proto.sftp.ChangeGroupRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeGroupRequest
						.deserializeBinaryFromReader,
				);
				msg.setChgrp(value);
				break;
			case 5:
				var value = new proto.proto.sftp.ChangeOwnerRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeOwnerRequest
						.deserializeBinaryFromReader,
				);
				msg.setChown(value);
				break;
			case 6:
				var value = new proto.proto.sftp.ChangeModeRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeModeRequest
						.deserializeBinaryFromReader,
				);
				msg.setChmod(value);
				break;
			case 7:
				var value = new proto.proto.sftp.ChangeModifyTimeRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeModifyTimeRequest
						.deserializeBinaryFromReader,
				);
				msg.setChmtime(value);
				break;
			case 8:
				var value = new proto.proto.sftp.MakeDirectoryRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.MakeDirectoryRequest
						.deserializeBinaryFromReader,
				);
				msg.setMkdir(value);
				break;
			case 9:
				var value = new proto.proto.sftp.RemoveDirectoryRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.RemoveDirectoryRequest
						.deserializeBinaryFromReader,
				);
				msg.setRmdir(value);
				break;
			case 10:
				var value = new proto.proto.sftp.RemoveFileRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.RemoveFileRequest
						.deserializeBinaryFromReader,
				);
				msg.setRm(value);
				break;
			case 11:
				var value = new proto.proto.sftp.RenameRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.RenameRequest.deserializeBinaryFromReader,
				);
				msg.setRename(value);
				break;
			case 12:
				var value = new proto.proto.sftp.SymbolicLinkRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.SymbolicLinkRequest
						.deserializeBinaryFromReader,
				);
				msg.setLn(value);
				break;
			case 13:
				var value = new proto.proto.sftp.ListDirectoryRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ListDirectoryRequest
						.deserializeBinaryFromReader,
				);
				msg.setLs(value);
				break;
			case 14:
				var value = new proto.proto.sftp.StatusRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.StatusRequest.deserializeBinaryFromReader,
				);
				msg.setStat(value);
				break;
			case 15:
				var value = new proto.proto.sftp.LinkStatusRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.LinkStatusRequest
						.deserializeBinaryFromReader,
				);
				msg.setLstat(value);
				break;
			case 16:
				var value =
					new proto.proto.sftp.VirtualFileSystemStatusRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.VirtualFileSystemStatusRequest
						.deserializeBinaryFromReader,
				);
				msg.setStatvfs(value);
				break;
			case 17:
				var value = new proto.proto.sftp.ReadLinkRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ReadLinkRequest
						.deserializeBinaryFromReader,
				);
				msg.setReadlink(value);
				break;
			case 18:
				var value = new proto.proto.sftp.PutRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.PutRequest.deserializeBinaryFromReader,
				);
				msg.setPut(value);
				break;
			case 19:
				var value = new proto.proto.sftp.GetRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.GetRequest.deserializeBinaryFromReader,
				);
				msg.setGet(value);
				break;
			case 20:
				var value = new proto.proto.sftp.ReadFileRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ReadFileRequest
						.deserializeBinaryFromReader,
				);
				msg.setReadfile(value);
				break;
			case 21:
				var value = new proto.proto.sftp.WriteFileRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.WriteFileRequest
						.deserializeBinaryFromReader,
				);
				msg.setWritefile(value);
				break;
			case 22:
				var value = new proto.proto.sftp.ExitRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.ExitRequest.deserializeBinaryFromReader,
				);
				msg.setExit(value);
				break;
			case 23:
				var value = new proto.proto.sftp.QuitRequest();
				reader.readMessage(
					value,
					proto.proto.sftp.QuitRequest.deserializeBinaryFromReader,
				);
				msg.setQuit(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.CommandRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.CommandRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.CommandRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.CommandRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getCd();
	if (f != null) {
		writer.writeMessage(
			2,
			f,
			proto.proto.sftp.ChangeDirectoryRequest.serializeBinaryToWriter,
		);
	}
	f = message.getPwd();
	if (f != null) {
		writer.writeMessage(
			3,
			f,
			proto.proto.sftp.PrintWorkingDirectoryRequest
				.serializeBinaryToWriter,
		);
	}
	f = message.getChgrp();
	if (f != null) {
		writer.writeMessage(
			4,
			f,
			proto.proto.sftp.ChangeGroupRequest.serializeBinaryToWriter,
		);
	}
	f = message.getChown();
	if (f != null) {
		writer.writeMessage(
			5,
			f,
			proto.proto.sftp.ChangeOwnerRequest.serializeBinaryToWriter,
		);
	}
	f = message.getChmod();
	if (f != null) {
		writer.writeMessage(
			6,
			f,
			proto.proto.sftp.ChangeModeRequest.serializeBinaryToWriter,
		);
	}
	f = message.getChmtime();
	if (f != null) {
		writer.writeMessage(
			7,
			f,
			proto.proto.sftp.ChangeModifyTimeRequest.serializeBinaryToWriter,
		);
	}
	f = message.getMkdir();
	if (f != null) {
		writer.writeMessage(
			8,
			f,
			proto.proto.sftp.MakeDirectoryRequest.serializeBinaryToWriter,
		);
	}
	f = message.getRmdir();
	if (f != null) {
		writer.writeMessage(
			9,
			f,
			proto.proto.sftp.RemoveDirectoryRequest.serializeBinaryToWriter,
		);
	}
	f = message.getRm();
	if (f != null) {
		writer.writeMessage(
			10,
			f,
			proto.proto.sftp.RemoveFileRequest.serializeBinaryToWriter,
		);
	}
	f = message.getRename();
	if (f != null) {
		writer.writeMessage(
			11,
			f,
			proto.proto.sftp.RenameRequest.serializeBinaryToWriter,
		);
	}
	f = message.getLn();
	if (f != null) {
		writer.writeMessage(
			12,
			f,
			proto.proto.sftp.SymbolicLinkRequest.serializeBinaryToWriter,
		);
	}
	f = message.getLs();
	if (f != null) {
		writer.writeMessage(
			13,
			f,
			proto.proto.sftp.ListDirectoryRequest.serializeBinaryToWriter,
		);
	}
	f = message.getStat();
	if (f != null) {
		writer.writeMessage(
			14,
			f,
			proto.proto.sftp.StatusRequest.serializeBinaryToWriter,
		);
	}
	f = message.getLstat();
	if (f != null) {
		writer.writeMessage(
			15,
			f,
			proto.proto.sftp.LinkStatusRequest.serializeBinaryToWriter,
		);
	}
	f = message.getStatvfs();
	if (f != null) {
		writer.writeMessage(
			16,
			f,
			proto.proto.sftp.VirtualFileSystemStatusRequest
				.serializeBinaryToWriter,
		);
	}
	f = message.getReadlink();
	if (f != null) {
		writer.writeMessage(
			17,
			f,
			proto.proto.sftp.ReadLinkRequest.serializeBinaryToWriter,
		);
	}
	f = message.getPut();
	if (f != null) {
		writer.writeMessage(
			18,
			f,
			proto.proto.sftp.PutRequest.serializeBinaryToWriter,
		);
	}
	f = message.getGet();
	if (f != null) {
		writer.writeMessage(
			19,
			f,
			proto.proto.sftp.GetRequest.serializeBinaryToWriter,
		);
	}
	f = message.getReadfile();
	if (f != null) {
		writer.writeMessage(
			20,
			f,
			proto.proto.sftp.ReadFileRequest.serializeBinaryToWriter,
		);
	}
	f = message.getWritefile();
	if (f != null) {
		writer.writeMessage(
			21,
			f,
			proto.proto.sftp.WriteFileRequest.serializeBinaryToWriter,
		);
	}
	f = message.getExit();
	if (f != null) {
		writer.writeMessage(
			22,
			f,
			proto.proto.sftp.ExitRequest.serializeBinaryToWriter,
		);
	}
	f = message.getQuit();
	if (f != null) {
		writer.writeMessage(
			23,
			f,
			proto.proto.sftp.QuitRequest.serializeBinaryToWriter,
		);
	}
};

/**
 * optional ChangeDirectoryRequest cd = 2;
 * @return {?proto.proto.sftp.ChangeDirectoryRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getCd = function () {
	return /** @type{?proto.proto.sftp.ChangeDirectoryRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeDirectoryRequest,
			2,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeDirectoryRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setCd = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		2,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearCd = function () {
	return this.setCd(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasCd = function () {
	return jspb.Message.getField(this, 2) != null;
};

/**
 * optional PrintWorkingDirectoryRequest pwd = 3;
 * @return {?proto.proto.sftp.PrintWorkingDirectoryRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getPwd = function () {
	return /** @type{?proto.proto.sftp.PrintWorkingDirectoryRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.PrintWorkingDirectoryRequest,
			3,
		)
	);
};

/**
 * @param {?proto.proto.sftp.PrintWorkingDirectoryRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setPwd = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		3,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearPwd = function () {
	return this.setPwd(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasPwd = function () {
	return jspb.Message.getField(this, 3) != null;
};

/**
 * optional ChangeGroupRequest chgrp = 4;
 * @return {?proto.proto.sftp.ChangeGroupRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getChgrp = function () {
	return /** @type{?proto.proto.sftp.ChangeGroupRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeGroupRequest,
			4,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeGroupRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setChgrp = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		4,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearChgrp = function () {
	return this.setChgrp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasChgrp = function () {
	return jspb.Message.getField(this, 4) != null;
};

/**
 * optional ChangeOwnerRequest chown = 5;
 * @return {?proto.proto.sftp.ChangeOwnerRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getChown = function () {
	return /** @type{?proto.proto.sftp.ChangeOwnerRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeOwnerRequest,
			5,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeOwnerRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setChown = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		5,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearChown = function () {
	return this.setChown(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasChown = function () {
	return jspb.Message.getField(this, 5) != null;
};

/**
 * optional ChangeModeRequest chmod = 6;
 * @return {?proto.proto.sftp.ChangeModeRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getChmod = function () {
	return /** @type{?proto.proto.sftp.ChangeModeRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeModeRequest,
			6,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeModeRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setChmod = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		6,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearChmod = function () {
	return this.setChmod(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasChmod = function () {
	return jspb.Message.getField(this, 6) != null;
};

/**
 * optional ChangeModifyTimeRequest chmtime = 7;
 * @return {?proto.proto.sftp.ChangeModifyTimeRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getChmtime = function () {
	return /** @type{?proto.proto.sftp.ChangeModifyTimeRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeModifyTimeRequest,
			7,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeModifyTimeRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setChmtime = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		7,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearChmtime = function () {
	return this.setChmtime(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasChmtime = function () {
	return jspb.Message.getField(this, 7) != null;
};

/**
 * optional MakeDirectoryRequest mkdir = 8;
 * @return {?proto.proto.sftp.MakeDirectoryRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getMkdir = function () {
	return /** @type{?proto.proto.sftp.MakeDirectoryRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.MakeDirectoryRequest,
			8,
		)
	);
};

/**
 * @param {?proto.proto.sftp.MakeDirectoryRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setMkdir = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		8,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearMkdir = function () {
	return this.setMkdir(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasMkdir = function () {
	return jspb.Message.getField(this, 8) != null;
};

/**
 * optional RemoveDirectoryRequest rmdir = 9;
 * @return {?proto.proto.sftp.RemoveDirectoryRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getRmdir = function () {
	return /** @type{?proto.proto.sftp.RemoveDirectoryRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.RemoveDirectoryRequest,
			9,
		)
	);
};

/**
 * @param {?proto.proto.sftp.RemoveDirectoryRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setRmdir = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		9,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearRmdir = function () {
	return this.setRmdir(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasRmdir = function () {
	return jspb.Message.getField(this, 9) != null;
};

/**
 * optional RemoveFileRequest rm = 10;
 * @return {?proto.proto.sftp.RemoveFileRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getRm = function () {
	return /** @type{?proto.proto.sftp.RemoveFileRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.RemoveFileRequest,
			10,
		)
	);
};

/**
 * @param {?proto.proto.sftp.RemoveFileRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setRm = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		10,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearRm = function () {
	return this.setRm(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasRm = function () {
	return jspb.Message.getField(this, 10) != null;
};

/**
 * optional RenameRequest rename = 11;
 * @return {?proto.proto.sftp.RenameRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getRename = function () {
	return /** @type{?proto.proto.sftp.RenameRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.RenameRequest, 11)
	);
};

/**
 * @param {?proto.proto.sftp.RenameRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setRename = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		11,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearRename = function () {
	return this.setRename(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasRename = function () {
	return jspb.Message.getField(this, 11) != null;
};

/**
 * optional SymbolicLinkRequest ln = 12;
 * @return {?proto.proto.sftp.SymbolicLinkRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getLn = function () {
	return /** @type{?proto.proto.sftp.SymbolicLinkRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.SymbolicLinkRequest,
			12,
		)
	);
};

/**
 * @param {?proto.proto.sftp.SymbolicLinkRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setLn = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		12,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearLn = function () {
	return this.setLn(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasLn = function () {
	return jspb.Message.getField(this, 12) != null;
};

/**
 * optional ListDirectoryRequest ls = 13;
 * @return {?proto.proto.sftp.ListDirectoryRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getLs = function () {
	return /** @type{?proto.proto.sftp.ListDirectoryRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ListDirectoryRequest,
			13,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ListDirectoryRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setLs = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		13,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearLs = function () {
	return this.setLs(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasLs = function () {
	return jspb.Message.getField(this, 13) != null;
};

/**
 * optional StatusRequest stat = 14;
 * @return {?proto.proto.sftp.StatusRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getStat = function () {
	return /** @type{?proto.proto.sftp.StatusRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.StatusRequest, 14)
	);
};

/**
 * @param {?proto.proto.sftp.StatusRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setStat = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		14,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearStat = function () {
	return this.setStat(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasStat = function () {
	return jspb.Message.getField(this, 14) != null;
};

/**
 * optional LinkStatusRequest lstat = 15;
 * @return {?proto.proto.sftp.LinkStatusRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getLstat = function () {
	return /** @type{?proto.proto.sftp.LinkStatusRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.LinkStatusRequest,
			15,
		)
	);
};

/**
 * @param {?proto.proto.sftp.LinkStatusRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setLstat = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		15,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearLstat = function () {
	return this.setLstat(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasLstat = function () {
	return jspb.Message.getField(this, 15) != null;
};

/**
 * optional VirtualFileSystemStatusRequest statVFS = 16;
 * @return {?proto.proto.sftp.VirtualFileSystemStatusRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getStatvfs = function () {
	return /** @type{?proto.proto.sftp.VirtualFileSystemStatusRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.VirtualFileSystemStatusRequest,
			16,
		)
	);
};

/**
 * @param {?proto.proto.sftp.VirtualFileSystemStatusRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setStatvfs = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		16,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearStatvfs = function () {
	return this.setStatvfs(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasStatvfs = function () {
	return jspb.Message.getField(this, 16) != null;
};

/**
 * optional ReadLinkRequest readlink = 17;
 * @return {?proto.proto.sftp.ReadLinkRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getReadlink = function () {
	return /** @type{?proto.proto.sftp.ReadLinkRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ReadLinkRequest, 17)
	);
};

/**
 * @param {?proto.proto.sftp.ReadLinkRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setReadlink = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		17,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearReadlink = function () {
	return this.setReadlink(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasReadlink = function () {
	return jspb.Message.getField(this, 17) != null;
};

/**
 * optional PutRequest put = 18;
 * @return {?proto.proto.sftp.PutRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getPut = function () {
	return /** @type{?proto.proto.sftp.PutRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.PutRequest, 18)
	);
};

/**
 * @param {?proto.proto.sftp.PutRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setPut = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		18,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearPut = function () {
	return this.setPut(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasPut = function () {
	return jspb.Message.getField(this, 18) != null;
};

/**
 * optional GetRequest get = 19;
 * @return {?proto.proto.sftp.GetRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getGet = function () {
	return /** @type{?proto.proto.sftp.GetRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.GetRequest, 19)
	);
};

/**
 * @param {?proto.proto.sftp.GetRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setGet = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		19,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearGet = function () {
	return this.setGet(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasGet = function () {
	return jspb.Message.getField(this, 19) != null;
};

/**
 * optional ReadFileRequest readFile = 20;
 * @return {?proto.proto.sftp.ReadFileRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getReadfile = function () {
	return /** @type{?proto.proto.sftp.ReadFileRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ReadFileRequest, 20)
	);
};

/**
 * @param {?proto.proto.sftp.ReadFileRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setReadfile = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		20,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearReadfile = function () {
	return this.setReadfile(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasReadfile = function () {
	return jspb.Message.getField(this, 20) != null;
};

/**
 * optional WriteFileRequest writeFile = 21;
 * @return {?proto.proto.sftp.WriteFileRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getWritefile = function () {
	return /** @type{?proto.proto.sftp.WriteFileRequest} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.WriteFileRequest,
			21,
		)
	);
};

/**
 * @param {?proto.proto.sftp.WriteFileRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setWritefile = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		21,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearWritefile = function () {
	return this.setWritefile(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasWritefile = function () {
	return jspb.Message.getField(this, 21) != null;
};

/**
 * optional ExitRequest exit = 22;
 * @return {?proto.proto.sftp.ExitRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getExit = function () {
	return /** @type{?proto.proto.sftp.ExitRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ExitRequest, 22)
	);
};

/**
 * @param {?proto.proto.sftp.ExitRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setExit = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		22,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearExit = function () {
	return this.setExit(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasExit = function () {
	return jspb.Message.getField(this, 22) != null;
};

/**
 * optional QuitRequest quit = 23;
 * @return {?proto.proto.sftp.QuitRequest}
 */
proto.proto.sftp.CommandRequest.prototype.getQuit = function () {
	return /** @type{?proto.proto.sftp.QuitRequest} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.QuitRequest, 23)
	);
};

/**
 * @param {?proto.proto.sftp.QuitRequest|undefined} value
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.setQuit = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		23,
		proto.proto.sftp.CommandRequest.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandRequest} returns this
 */
proto.proto.sftp.CommandRequest.prototype.clearQuit = function () {
	return this.setQuit(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandRequest.prototype.hasQuit = function () {
	return jspb.Message.getField(this, 23) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeDirectoryRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeDirectoryRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeDirectoryRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeDirectoryRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeDirectoryRequest}
 */
proto.proto.sftp.ChangeDirectoryRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeDirectoryRequest();
	return proto.proto.sftp.ChangeDirectoryRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeDirectoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeDirectoryRequest}
 */
proto.proto.sftp.ChangeDirectoryRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeDirectoryRequest.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.ChangeDirectoryRequest.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeDirectoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeDirectoryRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.ChangeDirectoryRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ChangeDirectoryRequest} returns this
 */
proto.proto.sftp.ChangeDirectoryRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.PrintWorkingDirectoryRequest.prototype.toObject =
		function (opt_includeInstance) {
			return proto.proto.sftp.PrintWorkingDirectoryRequest.toObject(
				opt_includeInstance,
				this,
			);
		};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.PrintWorkingDirectoryRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.PrintWorkingDirectoryRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.PrintWorkingDirectoryRequest}
 */
proto.proto.sftp.PrintWorkingDirectoryRequest.deserializeBinary = function (
	bytes,
) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.PrintWorkingDirectoryRequest();
	return proto.proto.sftp.PrintWorkingDirectoryRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.PrintWorkingDirectoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.PrintWorkingDirectoryRequest}
 */
proto.proto.sftp.PrintWorkingDirectoryRequest.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.PrintWorkingDirectoryRequest.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.PrintWorkingDirectoryRequest.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.PrintWorkingDirectoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.PrintWorkingDirectoryRequest.serializeBinaryToWriter =
	function (message, writer) {
		var f = undefined;
	};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeGroupRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeGroupRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeGroupRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeGroupRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				groupid: jspb.Message.getFieldWithDefault(msg, 1, 0),
				path: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeGroupRequest}
 */
proto.proto.sftp.ChangeGroupRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeGroupRequest();
	return proto.proto.sftp.ChangeGroupRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeGroupRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeGroupRequest}
 */
proto.proto.sftp.ChangeGroupRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setGroupid(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeGroupRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeGroupRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeGroupRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeGroupRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getGroupid();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional int32 groupId = 1;
 * @return {number}
 */
proto.proto.sftp.ChangeGroupRequest.prototype.getGroupid = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ChangeGroupRequest} returns this
 */
proto.proto.sftp.ChangeGroupRequest.prototype.setGroupid = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string path = 2;
 * @return {string}
 */
proto.proto.sftp.ChangeGroupRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ChangeGroupRequest} returns this
 */
proto.proto.sftp.ChangeGroupRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeOwnerRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeOwnerRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeOwnerRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeOwnerRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				userid: jspb.Message.getFieldWithDefault(msg, 1, 0),
				path: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeOwnerRequest}
 */
proto.proto.sftp.ChangeOwnerRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeOwnerRequest();
	return proto.proto.sftp.ChangeOwnerRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeOwnerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeOwnerRequest}
 */
proto.proto.sftp.ChangeOwnerRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setUserid(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeOwnerRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeOwnerRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeOwnerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeOwnerRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getUserid();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional int32 userId = 1;
 * @return {number}
 */
proto.proto.sftp.ChangeOwnerRequest.prototype.getUserid = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ChangeOwnerRequest} returns this
 */
proto.proto.sftp.ChangeOwnerRequest.prototype.setUserid = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string path = 2;
 * @return {string}
 */
proto.proto.sftp.ChangeOwnerRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ChangeOwnerRequest} returns this
 */
proto.proto.sftp.ChangeOwnerRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeModeRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeModeRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeModeRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeModeRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				permissions: jspb.Message.getFieldWithDefault(msg, 1, 0),
				path: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeModeRequest}
 */
proto.proto.sftp.ChangeModeRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeModeRequest();
	return proto.proto.sftp.ChangeModeRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeModeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeModeRequest}
 */
proto.proto.sftp.ChangeModeRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setPermissions(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeModeRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeModeRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeModeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeModeRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPermissions();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional int32 permissions = 1;
 * @return {number}
 */
proto.proto.sftp.ChangeModeRequest.prototype.getPermissions = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ChangeModeRequest} returns this
 */
proto.proto.sftp.ChangeModeRequest.prototype.setPermissions = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string path = 2;
 * @return {string}
 */
proto.proto.sftp.ChangeModeRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ChangeModeRequest} returns this
 */
proto.proto.sftp.ChangeModeRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeModifyTimeRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeModifyTimeRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeModifyTimeRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeModifyTimeRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				mtime: jspb.Message.getFieldWithDefault(msg, 1, 0),
				path: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeModifyTimeRequest}
 */
proto.proto.sftp.ChangeModifyTimeRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeModifyTimeRequest();
	return proto.proto.sftp.ChangeModifyTimeRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeModifyTimeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeModifyTimeRequest}
 */
proto.proto.sftp.ChangeModifyTimeRequest.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				case 1:
					var value = /** @type {number} */ (reader.readInt32());
					msg.setMtime(value);
					break;
				case 2:
					var value = /** @type {string} */ (reader.readString());
					msg.setPath(value);
					break;
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeModifyTimeRequest.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.ChangeModifyTimeRequest.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeModifyTimeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeModifyTimeRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getMtime();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional int32 mtime = 1;
 * @return {number}
 */
proto.proto.sftp.ChangeModifyTimeRequest.prototype.getMtime = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ChangeModifyTimeRequest} returns this
 */
proto.proto.sftp.ChangeModifyTimeRequest.prototype.setMtime = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional string path = 2;
 * @return {string}
 */
proto.proto.sftp.ChangeModifyTimeRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ChangeModifyTimeRequest} returns this
 */
proto.proto.sftp.ChangeModifyTimeRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.MakeDirectoryRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.MakeDirectoryRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.MakeDirectoryRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.MakeDirectoryRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.MakeDirectoryRequest}
 */
proto.proto.sftp.MakeDirectoryRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.MakeDirectoryRequest();
	return proto.proto.sftp.MakeDirectoryRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.MakeDirectoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.MakeDirectoryRequest}
 */
proto.proto.sftp.MakeDirectoryRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.MakeDirectoryRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.MakeDirectoryRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.MakeDirectoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.MakeDirectoryRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.MakeDirectoryRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.MakeDirectoryRequest} returns this
 */
proto.proto.sftp.MakeDirectoryRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RemoveDirectoryRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RemoveDirectoryRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RemoveDirectoryRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RemoveDirectoryRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RemoveDirectoryRequest}
 */
proto.proto.sftp.RemoveDirectoryRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RemoveDirectoryRequest();
	return proto.proto.sftp.RemoveDirectoryRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RemoveDirectoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RemoveDirectoryRequest}
 */
proto.proto.sftp.RemoveDirectoryRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RemoveDirectoryRequest.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.RemoveDirectoryRequest.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RemoveDirectoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RemoveDirectoryRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.RemoveDirectoryRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.RemoveDirectoryRequest} returns this
 */
proto.proto.sftp.RemoveDirectoryRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RemoveFileRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RemoveFileRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RemoveFileRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RemoveFileRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RemoveFileRequest}
 */
proto.proto.sftp.RemoveFileRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RemoveFileRequest();
	return proto.proto.sftp.RemoveFileRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RemoveFileRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RemoveFileRequest}
 */
proto.proto.sftp.RemoveFileRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RemoveFileRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.RemoveFileRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RemoveFileRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RemoveFileRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.RemoveFileRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.RemoveFileRequest} returns this
 */
proto.proto.sftp.RemoveFileRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RenameRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RenameRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RenameRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RenameRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				oldpath: jspb.Message.getFieldWithDefault(msg, 1, ''),
				newpath: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RenameRequest}
 */
proto.proto.sftp.RenameRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RenameRequest();
	return proto.proto.sftp.RenameRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RenameRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RenameRequest}
 */
proto.proto.sftp.RenameRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setOldpath(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setNewpath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RenameRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.RenameRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RenameRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RenameRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getOldpath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getNewpath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional string oldPath = 1;
 * @return {string}
 */
proto.proto.sftp.RenameRequest.prototype.getOldpath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.RenameRequest} returns this
 */
proto.proto.sftp.RenameRequest.prototype.setOldpath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string newPath = 2;
 * @return {string}
 */
proto.proto.sftp.RenameRequest.prototype.getNewpath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.RenameRequest} returns this
 */
proto.proto.sftp.RenameRequest.prototype.setNewpath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.SymbolicLinkRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.SymbolicLinkRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.SymbolicLinkRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.SymbolicLinkRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				oldpath: jspb.Message.getFieldWithDefault(msg, 1, ''),
				newpath: jspb.Message.getFieldWithDefault(msg, 2, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.SymbolicLinkRequest}
 */
proto.proto.sftp.SymbolicLinkRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.SymbolicLinkRequest();
	return proto.proto.sftp.SymbolicLinkRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.SymbolicLinkRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.SymbolicLinkRequest}
 */
proto.proto.sftp.SymbolicLinkRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setOldpath(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setNewpath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.SymbolicLinkRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.SymbolicLinkRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.SymbolicLinkRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.SymbolicLinkRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getOldpath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getNewpath();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
};

/**
 * optional string oldPath = 1;
 * @return {string}
 */
proto.proto.sftp.SymbolicLinkRequest.prototype.getOldpath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.SymbolicLinkRequest} returns this
 */
proto.proto.sftp.SymbolicLinkRequest.prototype.setOldpath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string newPath = 2;
 * @return {string}
 */
proto.proto.sftp.SymbolicLinkRequest.prototype.getNewpath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.SymbolicLinkRequest} returns this
 */
proto.proto.sftp.SymbolicLinkRequest.prototype.setNewpath = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ListDirectoryRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ListDirectoryRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ListDirectoryRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ListDirectoryRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ListDirectoryRequest}
 */
proto.proto.sftp.ListDirectoryRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ListDirectoryRequest();
	return proto.proto.sftp.ListDirectoryRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ListDirectoryRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ListDirectoryRequest}
 */
proto.proto.sftp.ListDirectoryRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ListDirectoryRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ListDirectoryRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ListDirectoryRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ListDirectoryRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.ListDirectoryRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ListDirectoryRequest} returns this
 */
proto.proto.sftp.ListDirectoryRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.StatusRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.StatusRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.StatusRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.StatusRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.StatusRequest}
 */
proto.proto.sftp.StatusRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.StatusRequest();
	return proto.proto.sftp.StatusRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.StatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.StatusRequest}
 */
proto.proto.sftp.StatusRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.StatusRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.StatusRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.StatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.StatusRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.StatusRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.StatusRequest} returns this
 */
proto.proto.sftp.StatusRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.LinkStatusRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.LinkStatusRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.LinkStatusRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.LinkStatusRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.LinkStatusRequest}
 */
proto.proto.sftp.LinkStatusRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.LinkStatusRequest();
	return proto.proto.sftp.LinkStatusRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.LinkStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.LinkStatusRequest}
 */
proto.proto.sftp.LinkStatusRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.LinkStatusRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.LinkStatusRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.LinkStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.LinkStatusRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.LinkStatusRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.LinkStatusRequest} returns this
 */
proto.proto.sftp.LinkStatusRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.VirtualFileSystemStatusRequest.prototype.toObject =
		function (opt_includeInstance) {
			return proto.proto.sftp.VirtualFileSystemStatusRequest.toObject(
				opt_includeInstance,
				this,
			);
		};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.VirtualFileSystemStatusRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.VirtualFileSystemStatusRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.VirtualFileSystemStatusRequest}
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.deserializeBinary = function (
	bytes,
) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.VirtualFileSystemStatusRequest();
	return proto.proto.sftp.VirtualFileSystemStatusRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.VirtualFileSystemStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.VirtualFileSystemStatusRequest}
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				case 1:
					var value = /** @type {string} */ (reader.readString());
					msg.setPath(value);
					break;
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.VirtualFileSystemStatusRequest.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.VirtualFileSystemStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.serializeBinaryToWriter =
	function (message, writer) {
		var f = undefined;
		f = message.getPath();
		if (f.length > 0) {
			writer.writeString(1, f);
		}
	};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.prototype.getPath =
	function () {
		return /** @type {string} */ (
			jspb.Message.getFieldWithDefault(this, 1, '')
		);
	};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusRequest} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusRequest.prototype.setPath = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ReadLinkRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ReadLinkRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ReadLinkRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ReadLinkRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ReadLinkRequest}
 */
proto.proto.sftp.ReadLinkRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ReadLinkRequest();
	return proto.proto.sftp.ReadLinkRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ReadLinkRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ReadLinkRequest}
 */
proto.proto.sftp.ReadLinkRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ReadLinkRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ReadLinkRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ReadLinkRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ReadLinkRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.ReadLinkRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ReadLinkRequest} returns this
 */
proto.proto.sftp.ReadLinkRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.PutRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.PutRequest.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.PutRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.PutRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
				filesize: jspb.Message.getFieldWithDefault(msg, 2, 0),
				data: msg.getData_asB64(),
				offset: jspb.Message.getFieldWithDefault(msg, 4, 0),
				last: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
				mode: jspb.Message.getFieldWithDefault(msg, 6, 0),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.PutRequest}
 */
proto.proto.sftp.PutRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.PutRequest();
	return proto.proto.sftp.PutRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.PutRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.PutRequest}
 */
proto.proto.sftp.PutRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setFilesize(value);
				break;
			case 3:
				var value = /** @type {!Uint8Array} */ (reader.readBytes());
				msg.setData(value);
				break;
			case 4:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setOffset(value);
				break;
			case 5:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setLast(value);
				break;
			case 6:
				var value = /** @type {!proto.proto.sftp.PutRequest.Mode} */ (
					reader.readEnum()
				);
				msg.setMode(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.PutRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.PutRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.PutRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.PutRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getFilesize();
	if (f !== 0) {
		writer.writeInt64(2, f);
	}
	f = message.getData_asU8();
	if (f.length > 0) {
		writer.writeBytes(3, f);
	}
	f = message.getOffset();
	if (f !== 0) {
		writer.writeInt64(4, f);
	}
	f = message.getLast();
	if (f) {
		writer.writeBool(5, f);
	}
	f = message.getMode();
	if (f !== 0.0) {
		writer.writeEnum(6, f);
	}
};

/**
 * @enum {number}
 */
proto.proto.sftp.PutRequest.Mode = {
	UNKNOWN: 0,
	OVERWRITE: 1,
	RESUME: 2,
	APPEND: 3,
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.PutRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int64 fileSize = 2;
 * @return {number}
 */
proto.proto.sftp.PutRequest.prototype.getFilesize = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setFilesize = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional bytes resourceGroupId = 3;
 * @return {!(string|Uint8Array)}
 */
proto.proto.sftp.PutRequest.prototype.getData = function () {
	return /** @type {!(string|Uint8Array)} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * optional bytes resourceGroupId = 3;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.proto.sftp.PutRequest.prototype.getData_asB64 = function () {
	return /** @type {string} */ (jspb.Message.bytesAsB64(this.getData()));
};

/**
 * optional bytes resourceGroupId = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.proto.sftp.PutRequest.prototype.getData_asU8 = function () {
	return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getData()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setData = function (value) {
	return jspb.Message.setProto3BytesField(this, 3, value);
};

/**
 * optional int64 offset = 4;
 * @return {number}
 */
proto.proto.sftp.PutRequest.prototype.getOffset = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setOffset = function (value) {
	return jspb.Message.setProto3IntField(this, 4, value);
};

/**
 * optional bool last = 5;
 * @return {boolean}
 */
proto.proto.sftp.PutRequest.prototype.getLast = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 5, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setLast = function (value) {
	return jspb.Message.setProto3BooleanField(this, 5, value);
};

/**
 * optional Mode mode = 6;
 * @return {!proto.proto.sftp.PutRequest.Mode}
 */
proto.proto.sftp.PutRequest.prototype.getMode = function () {
	return /** @type {!proto.proto.sftp.PutRequest.Mode} */ (
		jspb.Message.getFieldWithDefault(this, 6, 0)
	);
};

/**
 * @param {!proto.proto.sftp.PutRequest.Mode} value
 * @return {!proto.proto.sftp.PutRequest} returns this
 */
proto.proto.sftp.PutRequest.prototype.setMode = function (value) {
	return jspb.Message.setProto3EnumField(this, 6, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.GetRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.GetRequest.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.GetRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.GetRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
				offset: jspb.Message.getFieldWithDefault(msg, 2, 0),
				mode: jspb.Message.getFieldWithDefault(msg, 3, 0),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.GetRequest}
 */
proto.proto.sftp.GetRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.GetRequest();
	return proto.proto.sftp.GetRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.GetRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.GetRequest}
 */
proto.proto.sftp.GetRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setOffset(value);
				break;
			case 3:
				var value = /** @type {!proto.proto.sftp.GetRequest.Mode} */ (
					reader.readEnum()
				);
				msg.setMode(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.GetRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.GetRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.GetRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.GetRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getOffset();
	if (f !== 0) {
		writer.writeInt64(2, f);
	}
	f = message.getMode();
	if (f !== 0.0) {
		writer.writeEnum(3, f);
	}
};

/**
 * @enum {number}
 */
proto.proto.sftp.GetRequest.Mode = {
	UNKNOWN: 0,
	OVERWRITE: 1,
	RESUME: 2,
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.GetRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.GetRequest} returns this
 */
proto.proto.sftp.GetRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int64 offset = 2;
 * @return {number}
 */
proto.proto.sftp.GetRequest.prototype.getOffset = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.GetRequest} returns this
 */
proto.proto.sftp.GetRequest.prototype.setOffset = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional Mode mode = 3;
 * @return {!proto.proto.sftp.GetRequest.Mode}
 */
proto.proto.sftp.GetRequest.prototype.getMode = function () {
	return /** @type {!proto.proto.sftp.GetRequest.Mode} */ (
		jspb.Message.getFieldWithDefault(this, 3, 0)
	);
};

/**
 * @param {!proto.proto.sftp.GetRequest.Mode} value
 * @return {!proto.proto.sftp.GetRequest} returns this
 */
proto.proto.sftp.GetRequest.prototype.setMode = function (value) {
	return jspb.Message.setProto3EnumField(this, 3, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ReadFileRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ReadFileRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ReadFileRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ReadFileRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
				offset: jspb.Message.getFieldWithDefault(msg, 2, 0),
				length: jspb.Message.getFieldWithDefault(msg, 3, 0),
				completed: jspb.Message.getBooleanFieldWithDefault(
					msg,
					4,
					false,
				),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ReadFileRequest}
 */
proto.proto.sftp.ReadFileRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ReadFileRequest();
	return proto.proto.sftp.ReadFileRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ReadFileRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ReadFileRequest}
 */
proto.proto.sftp.ReadFileRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setOffset(value);
				break;
			case 3:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setLength(value);
				break;
			case 4:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setCompleted(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ReadFileRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ReadFileRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ReadFileRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ReadFileRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getOffset();
	if (f !== 0) {
		writer.writeInt64(2, f);
	}
	f = message.getLength();
	if (f !== 0) {
		writer.writeInt32(3, f);
	}
	f = message.getCompleted();
	if (f) {
		writer.writeBool(4, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.ReadFileRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ReadFileRequest} returns this
 */
proto.proto.sftp.ReadFileRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int64 offset = 2;
 * @return {number}
 */
proto.proto.sftp.ReadFileRequest.prototype.getOffset = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ReadFileRequest} returns this
 */
proto.proto.sftp.ReadFileRequest.prototype.setOffset = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional int32 length = 3;
 * @return {number}
 */
proto.proto.sftp.ReadFileRequest.prototype.getLength = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ReadFileRequest} returns this
 */
proto.proto.sftp.ReadFileRequest.prototype.setLength = function (value) {
	return jspb.Message.setProto3IntField(this, 3, value);
};

/**
 * optional bool completed = 4;
 * @return {boolean}
 */
proto.proto.sftp.ReadFileRequest.prototype.getCompleted = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 4, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.ReadFileRequest} returns this
 */
proto.proto.sftp.ReadFileRequest.prototype.setCompleted = function (value) {
	return jspb.Message.setProto3BooleanField(this, 4, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.WriteFileRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.WriteFileRequest.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.WriteFileRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.WriteFileRequest.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
				offset: jspb.Message.getFieldWithDefault(msg, 2, 0),
				length: jspb.Message.getFieldWithDefault(msg, 3, 0),
				data: msg.getData_asB64(),
				completed: jspb.Message.getBooleanFieldWithDefault(
					msg,
					5,
					false,
				),
				mode: jspb.Message.getFieldWithDefault(msg, 6, 0),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.WriteFileRequest}
 */
proto.proto.sftp.WriteFileRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.WriteFileRequest();
	return proto.proto.sftp.WriteFileRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.WriteFileRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.WriteFileRequest}
 */
proto.proto.sftp.WriteFileRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setOffset(value);
				break;
			case 3:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setLength(value);
				break;
			case 4:
				var value = /** @type {!Uint8Array} */ (reader.readBytes());
				msg.setData(value);
				break;
			case 5:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setCompleted(value);
				break;
			case 6:
				var value =
					/** @type {!proto.proto.sftp.WriteFileRequest.Mode} */ (
						reader.readEnum()
					);
				msg.setMode(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.WriteFileRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.WriteFileRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.WriteFileRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.WriteFileRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getOffset();
	if (f !== 0) {
		writer.writeInt64(2, f);
	}
	f = message.getLength();
	if (f !== 0) {
		writer.writeInt64(3, f);
	}
	f = message.getData_asU8();
	if (f.length > 0) {
		writer.writeBytes(4, f);
	}
	f = message.getCompleted();
	if (f) {
		writer.writeBool(5, f);
	}
	f = message.getMode();
	if (f !== 0.0) {
		writer.writeEnum(6, f);
	}
};

/**
 * @enum {number}
 */
proto.proto.sftp.WriteFileRequest.Mode = {
	UNKNOWN: 0,
	OVERWRITE: 1,
	RESUME: 2,
	APPEND: 3,
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.WriteFileRequest.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int64 offset = 2;
 * @return {number}
 */
proto.proto.sftp.WriteFileRequest.prototype.getOffset = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setOffset = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional int64 length = 3;
 * @return {number}
 */
proto.proto.sftp.WriteFileRequest.prototype.getLength = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setLength = function (value) {
	return jspb.Message.setProto3IntField(this, 3, value);
};

/**
 * optional bytes resourceGroupId = 4;
 * @return {!(string|Uint8Array)}
 */
proto.proto.sftp.WriteFileRequest.prototype.getData = function () {
	return /** @type {!(string|Uint8Array)} */ (
		jspb.Message.getFieldWithDefault(this, 4, '')
	);
};

/**
 * optional bytes resourceGroupId = 4;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.proto.sftp.WriteFileRequest.prototype.getData_asB64 = function () {
	return /** @type {string} */ (jspb.Message.bytesAsB64(this.getData()));
};

/**
 * optional bytes resourceGroupId = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.proto.sftp.WriteFileRequest.prototype.getData_asU8 = function () {
	return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getData()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setData = function (value) {
	return jspb.Message.setProto3BytesField(this, 4, value);
};

/**
 * optional bool completed = 5;
 * @return {boolean}
 */
proto.proto.sftp.WriteFileRequest.prototype.getCompleted = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 5, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setCompleted = function (value) {
	return jspb.Message.setProto3BooleanField(this, 5, value);
};

/**
 * optional Mode mode = 6;
 * @return {!proto.proto.sftp.WriteFileRequest.Mode}
 */
proto.proto.sftp.WriteFileRequest.prototype.getMode = function () {
	return /** @type {!proto.proto.sftp.WriteFileRequest.Mode} */ (
		jspb.Message.getFieldWithDefault(this, 6, 0)
	);
};

/**
 * @param {!proto.proto.sftp.WriteFileRequest.Mode} value
 * @return {!proto.proto.sftp.WriteFileRequest} returns this
 */
proto.proto.sftp.WriteFileRequest.prototype.setMode = function (value) {
	return jspb.Message.setProto3EnumField(this, 6, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ExitRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ExitRequest.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ExitRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ExitRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ExitRequest}
 */
proto.proto.sftp.ExitRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ExitRequest();
	return proto.proto.sftp.ExitRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ExitRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ExitRequest}
 */
proto.proto.sftp.ExitRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ExitRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ExitRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ExitRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ExitRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.QuitRequest.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.QuitRequest.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.QuitRequest} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.QuitRequest.toObject = function (includeInstance, msg) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.QuitRequest}
 */
proto.proto.sftp.QuitRequest.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.QuitRequest();
	return proto.proto.sftp.QuitRequest.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.QuitRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.QuitRequest}
 */
proto.proto.sftp.QuitRequest.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.QuitRequest.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.QuitRequest.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.QuitRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.QuitRequest.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.proto.sftp.Response.oneofGroups_ = [[1, 2, 3, 4]];

/**
 * @enum {number}
 */
proto.proto.sftp.Response.ResponseCase = {
	RESPONSE_NOT_SET: 0,
	CONNECT: 1,
	DISCONNECT: 2,
	COMMAND: 3,
	ERROR: 4,
};

/**
 * @return {proto.proto.sftp.Response.ResponseCase}
 */
proto.proto.sftp.Response.prototype.getResponseCase = function () {
	return /** @type {proto.proto.sftp.Response.ResponseCase} */ (
		jspb.Message.computeOneofCase(
			this,
			proto.proto.sftp.Response.oneofGroups_[0],
		)
	);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.Response.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.Response.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.Response} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.Response.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				connect:
					(f = msg.getConnect()) &&
					proto.proto.sftp.ConnectResponse.toObject(
						includeInstance,
						f,
					),
				disconnect:
					(f = msg.getDisconnect()) &&
					proto.proto.sftp.DisconnectResponse.toObject(
						includeInstance,
						f,
					),
				command:
					(f = msg.getCommand()) &&
					proto.proto.sftp.CommandResponse.toObject(
						includeInstance,
						f,
					),
				error:
					(f = msg.getError()) &&
					proto.proto.sftp.ErrorResponse.toObject(includeInstance, f),
				status: jspb.Message.getFieldWithDefault(msg, 5, 0),
				requestid: jspb.Message.getFieldWithDefault(msg, 6, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.Response}
 */
proto.proto.sftp.Response.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.Response();
	return proto.proto.sftp.Response.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.Response} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.Response}
 */
proto.proto.sftp.Response.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.ConnectResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ConnectResponse
						.deserializeBinaryFromReader,
				);
				msg.setConnect(value);
				break;
			case 2:
				var value = new proto.proto.sftp.DisconnectResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.DisconnectResponse
						.deserializeBinaryFromReader,
				);
				msg.setDisconnect(value);
				break;
			case 3:
				var value = new proto.proto.sftp.CommandResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.CommandResponse
						.deserializeBinaryFromReader,
				);
				msg.setCommand(value);
				break;
			case 4:
				var value = new proto.proto.sftp.ErrorResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ErrorResponse.deserializeBinaryFromReader,
				);
				msg.setError(value);
				break;
			case 5:
				var value = /** @type {!proto.proto.sftp.Response.Status} */ (
					reader.readEnum()
				);
				msg.setStatus(value);
				break;
			case 6:
				var value = /** @type {string} */ (reader.readString());
				msg.setRequestid(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.Response.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.Response.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.Response} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.Response.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getConnect();
	if (f != null) {
		writer.writeMessage(
			1,
			f,
			proto.proto.sftp.ConnectResponse.serializeBinaryToWriter,
		);
	}
	f = message.getDisconnect();
	if (f != null) {
		writer.writeMessage(
			2,
			f,
			proto.proto.sftp.DisconnectResponse.serializeBinaryToWriter,
		);
	}
	f = message.getCommand();
	if (f != null) {
		writer.writeMessage(
			3,
			f,
			proto.proto.sftp.CommandResponse.serializeBinaryToWriter,
		);
	}
	f = message.getError();
	if (f != null) {
		writer.writeMessage(
			4,
			f,
			proto.proto.sftp.ErrorResponse.serializeBinaryToWriter,
		);
	}
	f = message.getStatus();
	if (f !== 0.0) {
		writer.writeEnum(5, f);
	}
	f = message.getRequestid();
	if (f.length > 0) {
		writer.writeString(6, f);
	}
};

/**
 * @enum {number}
 */
proto.proto.sftp.Response.Status = {
	UNKNOWN: 0,
	CONTINUE: 100,
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	REQUEST_TIMEOUT: 408,
	INTERNAL_ERROR: 500,
	SERVER_BUSY: 504,
};

/**
 * optional ConnectResponse connect = 1;
 * @return {?proto.proto.sftp.ConnectResponse}
 */
proto.proto.sftp.Response.prototype.getConnect = function () {
	return /** @type{?proto.proto.sftp.ConnectResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ConnectResponse, 1)
	);
};

/**
 * @param {?proto.proto.sftp.ConnectResponse|undefined} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setConnect = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		1,
		proto.proto.sftp.Response.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.clearConnect = function () {
	return this.setConnect(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Response.prototype.hasConnect = function () {
	return jspb.Message.getField(this, 1) != null;
};

/**
 * optional DisconnectResponse disconnect = 2;
 * @return {?proto.proto.sftp.DisconnectResponse}
 */
proto.proto.sftp.Response.prototype.getDisconnect = function () {
	return /** @type{?proto.proto.sftp.DisconnectResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.DisconnectResponse,
			2,
		)
	);
};

/**
 * @param {?proto.proto.sftp.DisconnectResponse|undefined} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setDisconnect = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		2,
		proto.proto.sftp.Response.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.clearDisconnect = function () {
	return this.setDisconnect(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Response.prototype.hasDisconnect = function () {
	return jspb.Message.getField(this, 2) != null;
};

/**
 * optional CommandResponse command = 3;
 * @return {?proto.proto.sftp.CommandResponse}
 */
proto.proto.sftp.Response.prototype.getCommand = function () {
	return /** @type{?proto.proto.sftp.CommandResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.CommandResponse, 3)
	);
};

/**
 * @param {?proto.proto.sftp.CommandResponse|undefined} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setCommand = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		3,
		proto.proto.sftp.Response.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.clearCommand = function () {
	return this.setCommand(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Response.prototype.hasCommand = function () {
	return jspb.Message.getField(this, 3) != null;
};

/**
 * optional ErrorResponse error = 4;
 * @return {?proto.proto.sftp.ErrorResponse}
 */
proto.proto.sftp.Response.prototype.getError = function () {
	return /** @type{?proto.proto.sftp.ErrorResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ErrorResponse, 4)
	);
};

/**
 * @param {?proto.proto.sftp.ErrorResponse|undefined} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setError = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		4,
		proto.proto.sftp.Response.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.clearError = function () {
	return this.setError(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.Response.prototype.hasError = function () {
	return jspb.Message.getField(this, 4) != null;
};

/**
 * optional Status status = 5;
 * @return {!proto.proto.sftp.Response.Status}
 */
proto.proto.sftp.Response.prototype.getStatus = function () {
	return /** @type {!proto.proto.sftp.Response.Status} */ (
		jspb.Message.getFieldWithDefault(this, 5, 0)
	);
};

/**
 * @param {!proto.proto.sftp.Response.Status} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setStatus = function (value) {
	return jspb.Message.setProto3EnumField(this, 5, value);
};

/**
 * optional string requestId = 6;
 * @return {string}
 */
proto.proto.sftp.Response.prototype.getRequestid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 6, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.Response} returns this
 */
proto.proto.sftp.Response.prototype.setRequestid = function (value) {
	return jspb.Message.setProto3StringField(this, 6, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ConnectResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ConnectResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ConnectResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ConnectResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				uuid: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ConnectResponse}
 */
proto.proto.sftp.ConnectResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ConnectResponse();
	return proto.proto.sftp.ConnectResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ConnectResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ConnectResponse}
 */
proto.proto.sftp.ConnectResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setUuid(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ConnectResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ConnectResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ConnectResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ConnectResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getUuid();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string uuid = 1;
 * @return {string}
 */
proto.proto.sftp.ConnectResponse.prototype.getUuid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ConnectResponse} returns this
 */
proto.proto.sftp.ConnectResponse.prototype.setUuid = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.DisconnectResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.DisconnectResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.DisconnectResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.DisconnectResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.DisconnectResponse}
 */
proto.proto.sftp.DisconnectResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.DisconnectResponse();
	return proto.proto.sftp.DisconnectResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.DisconnectResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.DisconnectResponse}
 */
proto.proto.sftp.DisconnectResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.DisconnectResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.DisconnectResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.DisconnectResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.DisconnectResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.proto.sftp.CommandResponse.oneofGroups_ = [
	[
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23,
	],
];

/**
 * @enum {number}
 */
proto.proto.sftp.CommandResponse.CommandCase = {
	COMMAND_NOT_SET: 0,
	CD: 2,
	PWD: 3,
	CHGRP: 4,
	CHOWN: 5,
	CHMOD: 6,
	CHMTIME: 7,
	MKDIR: 8,
	RMDIR: 9,
	RM: 10,
	RENAME: 11,
	LN: 12,
	LS: 13,
	STAT: 14,
	LSTAT: 15,
	STATVFS: 16,
	READLINK: 17,
	PUT: 18,
	GET: 19,
	READFILE: 20,
	WRITEFILE: 21,
	EXIT: 22,
	QUIT: 23,
};

/**
 * @return {proto.proto.sftp.CommandResponse.CommandCase}
 */
proto.proto.sftp.CommandResponse.prototype.getCommandCase = function () {
	return /** @type {proto.proto.sftp.CommandResponse.CommandCase} */ (
		jspb.Message.computeOneofCase(
			this,
			proto.proto.sftp.CommandResponse.oneofGroups_[0],
		)
	);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.CommandResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.CommandResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.CommandResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.CommandResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				cd:
					(f = msg.getCd()) &&
					proto.proto.sftp.ChangeDirectoryResponse.toObject(
						includeInstance,
						f,
					),
				pwd:
					(f = msg.getPwd()) &&
					proto.proto.sftp.PrintWorkingDirectoryResponse.toObject(
						includeInstance,
						f,
					),
				chgrp:
					(f = msg.getChgrp()) &&
					proto.proto.sftp.ChangeGroupResponse.toObject(
						includeInstance,
						f,
					),
				chown:
					(f = msg.getChown()) &&
					proto.proto.sftp.ChangeOwnerResponse.toObject(
						includeInstance,
						f,
					),
				chmod:
					(f = msg.getChmod()) &&
					proto.proto.sftp.ChangeModeResponse.toObject(
						includeInstance,
						f,
					),
				chmtime:
					(f = msg.getChmtime()) &&
					proto.proto.sftp.ChangeModifyTimeResponse.toObject(
						includeInstance,
						f,
					),
				mkdir:
					(f = msg.getMkdir()) &&
					proto.proto.sftp.MakeDirectoryResponse.toObject(
						includeInstance,
						f,
					),
				rmdir:
					(f = msg.getRmdir()) &&
					proto.proto.sftp.RemoveDirectoryResponse.toObject(
						includeInstance,
						f,
					),
				rm:
					(f = msg.getRm()) &&
					proto.proto.sftp.RemoveFileResponse.toObject(
						includeInstance,
						f,
					),
				rename:
					(f = msg.getRename()) &&
					proto.proto.sftp.RenameResponse.toObject(
						includeInstance,
						f,
					),
				ln:
					(f = msg.getLn()) &&
					proto.proto.sftp.SymbolicLinkResponse.toObject(
						includeInstance,
						f,
					),
				ls:
					(f = msg.getLs()) &&
					proto.proto.sftp.ListDirectoryResponse.toObject(
						includeInstance,
						f,
					),
				stat:
					(f = msg.getStat()) &&
					proto.proto.sftp.StatusResponse.toObject(
						includeInstance,
						f,
					),
				lstat:
					(f = msg.getLstat()) &&
					proto.proto.sftp.LinkStatusResponse.toObject(
						includeInstance,
						f,
					),
				statvfs:
					(f = msg.getStatvfs()) &&
					proto.proto.sftp.VirtualFileSystemStatusResponse.toObject(
						includeInstance,
						f,
					),
				readlink:
					(f = msg.getReadlink()) &&
					proto.proto.sftp.ReadLinkResponse.toObject(
						includeInstance,
						f,
					),
				put:
					(f = msg.getPut()) &&
					proto.proto.sftp.PutResponse.toObject(includeInstance, f),
				get:
					(f = msg.getGet()) &&
					proto.proto.sftp.GetResponse.toObject(includeInstance, f),
				readfile:
					(f = msg.getReadfile()) &&
					proto.proto.sftp.ReadFileResponse.toObject(
						includeInstance,
						f,
					),
				writefile:
					(f = msg.getWritefile()) &&
					proto.proto.sftp.WriteFileResponse.toObject(
						includeInstance,
						f,
					),
				exit:
					(f = msg.getExit()) &&
					proto.proto.sftp.ExitResponse.toObject(includeInstance, f),
				quit:
					(f = msg.getQuit()) &&
					proto.proto.sftp.QuitResponse.toObject(includeInstance, f),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.CommandResponse}
 */
proto.proto.sftp.CommandResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.CommandResponse();
	return proto.proto.sftp.CommandResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.CommandResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.CommandResponse}
 */
proto.proto.sftp.CommandResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 2:
				var value = new proto.proto.sftp.ChangeDirectoryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeDirectoryResponse
						.deserializeBinaryFromReader,
				);
				msg.setCd(value);
				break;
			case 3:
				var value =
					new proto.proto.sftp.PrintWorkingDirectoryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.PrintWorkingDirectoryResponse
						.deserializeBinaryFromReader,
				);
				msg.setPwd(value);
				break;
			case 4:
				var value = new proto.proto.sftp.ChangeGroupResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeGroupResponse
						.deserializeBinaryFromReader,
				);
				msg.setChgrp(value);
				break;
			case 5:
				var value = new proto.proto.sftp.ChangeOwnerResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeOwnerResponse
						.deserializeBinaryFromReader,
				);
				msg.setChown(value);
				break;
			case 6:
				var value = new proto.proto.sftp.ChangeModeResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeModeResponse
						.deserializeBinaryFromReader,
				);
				msg.setChmod(value);
				break;
			case 7:
				var value = new proto.proto.sftp.ChangeModifyTimeResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ChangeModifyTimeResponse
						.deserializeBinaryFromReader,
				);
				msg.setChmtime(value);
				break;
			case 8:
				var value = new proto.proto.sftp.MakeDirectoryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.MakeDirectoryResponse
						.deserializeBinaryFromReader,
				);
				msg.setMkdir(value);
				break;
			case 9:
				var value = new proto.proto.sftp.RemoveDirectoryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.RemoveDirectoryResponse
						.deserializeBinaryFromReader,
				);
				msg.setRmdir(value);
				break;
			case 10:
				var value = new proto.proto.sftp.RemoveFileResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.RemoveFileResponse
						.deserializeBinaryFromReader,
				);
				msg.setRm(value);
				break;
			case 11:
				var value = new proto.proto.sftp.RenameResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.RenameResponse.deserializeBinaryFromReader,
				);
				msg.setRename(value);
				break;
			case 12:
				var value = new proto.proto.sftp.SymbolicLinkResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.SymbolicLinkResponse
						.deserializeBinaryFromReader,
				);
				msg.setLn(value);
				break;
			case 13:
				var value = new proto.proto.sftp.ListDirectoryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ListDirectoryResponse
						.deserializeBinaryFromReader,
				);
				msg.setLs(value);
				break;
			case 14:
				var value = new proto.proto.sftp.StatusResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.StatusResponse.deserializeBinaryFromReader,
				);
				msg.setStat(value);
				break;
			case 15:
				var value = new proto.proto.sftp.LinkStatusResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.LinkStatusResponse
						.deserializeBinaryFromReader,
				);
				msg.setLstat(value);
				break;
			case 16:
				var value =
					new proto.proto.sftp.VirtualFileSystemStatusResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.VirtualFileSystemStatusResponse
						.deserializeBinaryFromReader,
				);
				msg.setStatvfs(value);
				break;
			case 17:
				var value = new proto.proto.sftp.ReadLinkResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ReadLinkResponse
						.deserializeBinaryFromReader,
				);
				msg.setReadlink(value);
				break;
			case 18:
				var value = new proto.proto.sftp.PutResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.PutResponse.deserializeBinaryFromReader,
				);
				msg.setPut(value);
				break;
			case 19:
				var value = new proto.proto.sftp.GetResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.GetResponse.deserializeBinaryFromReader,
				);
				msg.setGet(value);
				break;
			case 20:
				var value = new proto.proto.sftp.ReadFileResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ReadFileResponse
						.deserializeBinaryFromReader,
				);
				msg.setReadfile(value);
				break;
			case 21:
				var value = new proto.proto.sftp.WriteFileResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.WriteFileResponse
						.deserializeBinaryFromReader,
				);
				msg.setWritefile(value);
				break;
			case 22:
				var value = new proto.proto.sftp.ExitResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.ExitResponse.deserializeBinaryFromReader,
				);
				msg.setExit(value);
				break;
			case 23:
				var value = new proto.proto.sftp.QuitResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.QuitResponse.deserializeBinaryFromReader,
				);
				msg.setQuit(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.CommandResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.CommandResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.CommandResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.CommandResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getCd();
	if (f != null) {
		writer.writeMessage(
			2,
			f,
			proto.proto.sftp.ChangeDirectoryResponse.serializeBinaryToWriter,
		);
	}
	f = message.getPwd();
	if (f != null) {
		writer.writeMessage(
			3,
			f,
			proto.proto.sftp.PrintWorkingDirectoryResponse
				.serializeBinaryToWriter,
		);
	}
	f = message.getChgrp();
	if (f != null) {
		writer.writeMessage(
			4,
			f,
			proto.proto.sftp.ChangeGroupResponse.serializeBinaryToWriter,
		);
	}
	f = message.getChown();
	if (f != null) {
		writer.writeMessage(
			5,
			f,
			proto.proto.sftp.ChangeOwnerResponse.serializeBinaryToWriter,
		);
	}
	f = message.getChmod();
	if (f != null) {
		writer.writeMessage(
			6,
			f,
			proto.proto.sftp.ChangeModeResponse.serializeBinaryToWriter,
		);
	}
	f = message.getChmtime();
	if (f != null) {
		writer.writeMessage(
			7,
			f,
			proto.proto.sftp.ChangeModifyTimeResponse.serializeBinaryToWriter,
		);
	}
	f = message.getMkdir();
	if (f != null) {
		writer.writeMessage(
			8,
			f,
			proto.proto.sftp.MakeDirectoryResponse.serializeBinaryToWriter,
		);
	}
	f = message.getRmdir();
	if (f != null) {
		writer.writeMessage(
			9,
			f,
			proto.proto.sftp.RemoveDirectoryResponse.serializeBinaryToWriter,
		);
	}
	f = message.getRm();
	if (f != null) {
		writer.writeMessage(
			10,
			f,
			proto.proto.sftp.RemoveFileResponse.serializeBinaryToWriter,
		);
	}
	f = message.getRename();
	if (f != null) {
		writer.writeMessage(
			11,
			f,
			proto.proto.sftp.RenameResponse.serializeBinaryToWriter,
		);
	}
	f = message.getLn();
	if (f != null) {
		writer.writeMessage(
			12,
			f,
			proto.proto.sftp.SymbolicLinkResponse.serializeBinaryToWriter,
		);
	}
	f = message.getLs();
	if (f != null) {
		writer.writeMessage(
			13,
			f,
			proto.proto.sftp.ListDirectoryResponse.serializeBinaryToWriter,
		);
	}
	f = message.getStat();
	if (f != null) {
		writer.writeMessage(
			14,
			f,
			proto.proto.sftp.StatusResponse.serializeBinaryToWriter,
		);
	}
	f = message.getLstat();
	if (f != null) {
		writer.writeMessage(
			15,
			f,
			proto.proto.sftp.LinkStatusResponse.serializeBinaryToWriter,
		);
	}
	f = message.getStatvfs();
	if (f != null) {
		writer.writeMessage(
			16,
			f,
			proto.proto.sftp.VirtualFileSystemStatusResponse
				.serializeBinaryToWriter,
		);
	}
	f = message.getReadlink();
	if (f != null) {
		writer.writeMessage(
			17,
			f,
			proto.proto.sftp.ReadLinkResponse.serializeBinaryToWriter,
		);
	}
	f = message.getPut();
	if (f != null) {
		writer.writeMessage(
			18,
			f,
			proto.proto.sftp.PutResponse.serializeBinaryToWriter,
		);
	}
	f = message.getGet();
	if (f != null) {
		writer.writeMessage(
			19,
			f,
			proto.proto.sftp.GetResponse.serializeBinaryToWriter,
		);
	}
	f = message.getReadfile();
	if (f != null) {
		writer.writeMessage(
			20,
			f,
			proto.proto.sftp.ReadFileResponse.serializeBinaryToWriter,
		);
	}
	f = message.getWritefile();
	if (f != null) {
		writer.writeMessage(
			21,
			f,
			proto.proto.sftp.WriteFileResponse.serializeBinaryToWriter,
		);
	}
	f = message.getExit();
	if (f != null) {
		writer.writeMessage(
			22,
			f,
			proto.proto.sftp.ExitResponse.serializeBinaryToWriter,
		);
	}
	f = message.getQuit();
	if (f != null) {
		writer.writeMessage(
			23,
			f,
			proto.proto.sftp.QuitResponse.serializeBinaryToWriter,
		);
	}
};

/**
 * optional ChangeDirectoryResponse cd = 2;
 * @return {?proto.proto.sftp.ChangeDirectoryResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getCd = function () {
	return /** @type{?proto.proto.sftp.ChangeDirectoryResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeDirectoryResponse,
			2,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeDirectoryResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setCd = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		2,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearCd = function () {
	return this.setCd(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasCd = function () {
	return jspb.Message.getField(this, 2) != null;
};

/**
 * optional PrintWorkingDirectoryResponse pwd = 3;
 * @return {?proto.proto.sftp.PrintWorkingDirectoryResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getPwd = function () {
	return /** @type{?proto.proto.sftp.PrintWorkingDirectoryResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.PrintWorkingDirectoryResponse,
			3,
		)
	);
};

/**
 * @param {?proto.proto.sftp.PrintWorkingDirectoryResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setPwd = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		3,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearPwd = function () {
	return this.setPwd(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasPwd = function () {
	return jspb.Message.getField(this, 3) != null;
};

/**
 * optional ChangeGroupResponse chgrp = 4;
 * @return {?proto.proto.sftp.ChangeGroupResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getChgrp = function () {
	return /** @type{?proto.proto.sftp.ChangeGroupResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeGroupResponse,
			4,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeGroupResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setChgrp = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		4,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearChgrp = function () {
	return this.setChgrp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasChgrp = function () {
	return jspb.Message.getField(this, 4) != null;
};

/**
 * optional ChangeOwnerResponse chown = 5;
 * @return {?proto.proto.sftp.ChangeOwnerResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getChown = function () {
	return /** @type{?proto.proto.sftp.ChangeOwnerResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeOwnerResponse,
			5,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeOwnerResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setChown = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		5,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearChown = function () {
	return this.setChown(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasChown = function () {
	return jspb.Message.getField(this, 5) != null;
};

/**
 * optional ChangeModeResponse chmod = 6;
 * @return {?proto.proto.sftp.ChangeModeResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getChmod = function () {
	return /** @type{?proto.proto.sftp.ChangeModeResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeModeResponse,
			6,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeModeResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setChmod = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		6,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearChmod = function () {
	return this.setChmod(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasChmod = function () {
	return jspb.Message.getField(this, 6) != null;
};

/**
 * optional ChangeModifyTimeResponse chmtime = 7;
 * @return {?proto.proto.sftp.ChangeModifyTimeResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getChmtime = function () {
	return /** @type{?proto.proto.sftp.ChangeModifyTimeResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ChangeModifyTimeResponse,
			7,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ChangeModifyTimeResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setChmtime = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		7,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearChmtime = function () {
	return this.setChmtime(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasChmtime = function () {
	return jspb.Message.getField(this, 7) != null;
};

/**
 * optional MakeDirectoryResponse mkdir = 8;
 * @return {?proto.proto.sftp.MakeDirectoryResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getMkdir = function () {
	return /** @type{?proto.proto.sftp.MakeDirectoryResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.MakeDirectoryResponse,
			8,
		)
	);
};

/**
 * @param {?proto.proto.sftp.MakeDirectoryResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setMkdir = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		8,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearMkdir = function () {
	return this.setMkdir(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasMkdir = function () {
	return jspb.Message.getField(this, 8) != null;
};

/**
 * optional RemoveDirectoryResponse rmdir = 9;
 * @return {?proto.proto.sftp.RemoveDirectoryResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getRmdir = function () {
	return /** @type{?proto.proto.sftp.RemoveDirectoryResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.RemoveDirectoryResponse,
			9,
		)
	);
};

/**
 * @param {?proto.proto.sftp.RemoveDirectoryResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setRmdir = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		9,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearRmdir = function () {
	return this.setRmdir(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasRmdir = function () {
	return jspb.Message.getField(this, 9) != null;
};

/**
 * optional RemoveFileResponse rm = 10;
 * @return {?proto.proto.sftp.RemoveFileResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getRm = function () {
	return /** @type{?proto.proto.sftp.RemoveFileResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.RemoveFileResponse,
			10,
		)
	);
};

/**
 * @param {?proto.proto.sftp.RemoveFileResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setRm = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		10,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearRm = function () {
	return this.setRm(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasRm = function () {
	return jspb.Message.getField(this, 10) != null;
};

/**
 * optional RenameResponse rename = 11;
 * @return {?proto.proto.sftp.RenameResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getRename = function () {
	return /** @type{?proto.proto.sftp.RenameResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.RenameResponse, 11)
	);
};

/**
 * @param {?proto.proto.sftp.RenameResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setRename = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		11,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearRename = function () {
	return this.setRename(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasRename = function () {
	return jspb.Message.getField(this, 11) != null;
};

/**
 * optional SymbolicLinkResponse ln = 12;
 * @return {?proto.proto.sftp.SymbolicLinkResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getLn = function () {
	return /** @type{?proto.proto.sftp.SymbolicLinkResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.SymbolicLinkResponse,
			12,
		)
	);
};

/**
 * @param {?proto.proto.sftp.SymbolicLinkResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setLn = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		12,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearLn = function () {
	return this.setLn(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasLn = function () {
	return jspb.Message.getField(this, 12) != null;
};

/**
 * optional ListDirectoryResponse ls = 13;
 * @return {?proto.proto.sftp.ListDirectoryResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getLs = function () {
	return /** @type{?proto.proto.sftp.ListDirectoryResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ListDirectoryResponse,
			13,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ListDirectoryResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setLs = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		13,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearLs = function () {
	return this.setLs(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasLs = function () {
	return jspb.Message.getField(this, 13) != null;
};

/**
 * optional StatusResponse stat = 14;
 * @return {?proto.proto.sftp.StatusResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getStat = function () {
	return /** @type{?proto.proto.sftp.StatusResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.StatusResponse, 14)
	);
};

/**
 * @param {?proto.proto.sftp.StatusResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setStat = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		14,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearStat = function () {
	return this.setStat(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasStat = function () {
	return jspb.Message.getField(this, 14) != null;
};

/**
 * optional LinkStatusResponse lstat = 15;
 * @return {?proto.proto.sftp.LinkStatusResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getLstat = function () {
	return /** @type{?proto.proto.sftp.LinkStatusResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.LinkStatusResponse,
			15,
		)
	);
};

/**
 * @param {?proto.proto.sftp.LinkStatusResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setLstat = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		15,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearLstat = function () {
	return this.setLstat(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasLstat = function () {
	return jspb.Message.getField(this, 15) != null;
};

/**
 * optional VirtualFileSystemStatusResponse statVFS = 16;
 * @return {?proto.proto.sftp.VirtualFileSystemStatusResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getStatvfs = function () {
	return /** @type{?proto.proto.sftp.VirtualFileSystemStatusResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.VirtualFileSystemStatusResponse,
			16,
		)
	);
};

/**
 * @param {?proto.proto.sftp.VirtualFileSystemStatusResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setStatvfs = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		16,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearStatvfs = function () {
	return this.setStatvfs(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasStatvfs = function () {
	return jspb.Message.getField(this, 16) != null;
};

/**
 * optional ReadLinkResponse readlink = 17;
 * @return {?proto.proto.sftp.ReadLinkResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getReadlink = function () {
	return /** @type{?proto.proto.sftp.ReadLinkResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ReadLinkResponse,
			17,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ReadLinkResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setReadlink = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		17,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearReadlink = function () {
	return this.setReadlink(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasReadlink = function () {
	return jspb.Message.getField(this, 17) != null;
};

/**
 * optional PutResponse put = 18;
 * @return {?proto.proto.sftp.PutResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getPut = function () {
	return /** @type{?proto.proto.sftp.PutResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.PutResponse, 18)
	);
};

/**
 * @param {?proto.proto.sftp.PutResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setPut = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		18,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearPut = function () {
	return this.setPut(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasPut = function () {
	return jspb.Message.getField(this, 18) != null;
};

/**
 * optional GetResponse get = 19;
 * @return {?proto.proto.sftp.GetResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getGet = function () {
	return /** @type{?proto.proto.sftp.GetResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.GetResponse, 19)
	);
};

/**
 * @param {?proto.proto.sftp.GetResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setGet = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		19,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearGet = function () {
	return this.setGet(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasGet = function () {
	return jspb.Message.getField(this, 19) != null;
};

/**
 * optional ReadFileResponse readFile = 20;
 * @return {?proto.proto.sftp.ReadFileResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getReadfile = function () {
	return /** @type{?proto.proto.sftp.ReadFileResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.ReadFileResponse,
			20,
		)
	);
};

/**
 * @param {?proto.proto.sftp.ReadFileResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setReadfile = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		20,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearReadfile = function () {
	return this.setReadfile(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasReadfile = function () {
	return jspb.Message.getField(this, 20) != null;
};

/**
 * optional WriteFileResponse writeFile = 21;
 * @return {?proto.proto.sftp.WriteFileResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getWritefile = function () {
	return /** @type{?proto.proto.sftp.WriteFileResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.WriteFileResponse,
			21,
		)
	);
};

/**
 * @param {?proto.proto.sftp.WriteFileResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setWritefile = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		21,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearWritefile = function () {
	return this.setWritefile(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasWritefile = function () {
	return jspb.Message.getField(this, 21) != null;
};

/**
 * optional ExitResponse exit = 22;
 * @return {?proto.proto.sftp.ExitResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getExit = function () {
	return /** @type{?proto.proto.sftp.ExitResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.ExitResponse, 22)
	);
};

/**
 * @param {?proto.proto.sftp.ExitResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setExit = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		22,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearExit = function () {
	return this.setExit(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasExit = function () {
	return jspb.Message.getField(this, 22) != null;
};

/**
 * optional QuitResponse quit = 23;
 * @return {?proto.proto.sftp.QuitResponse}
 */
proto.proto.sftp.CommandResponse.prototype.getQuit = function () {
	return /** @type{?proto.proto.sftp.QuitResponse} */ (
		jspb.Message.getWrapperField(this, proto.proto.sftp.QuitResponse, 23)
	);
};

/**
 * @param {?proto.proto.sftp.QuitResponse|undefined} value
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.setQuit = function (value) {
	return jspb.Message.setOneofWrapperField(
		this,
		23,
		proto.proto.sftp.CommandResponse.oneofGroups_[0],
		value,
	);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.CommandResponse} returns this
 */
proto.proto.sftp.CommandResponse.prototype.clearQuit = function () {
	return this.setQuit(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.CommandResponse.prototype.hasQuit = function () {
	return jspb.Message.getField(this, 23) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeDirectoryResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeDirectoryResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeDirectoryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeDirectoryResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeDirectoryResponse}
 */
proto.proto.sftp.ChangeDirectoryResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeDirectoryResponse();
	return proto.proto.sftp.ChangeDirectoryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeDirectoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeDirectoryResponse}
 */
proto.proto.sftp.ChangeDirectoryResponse.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeDirectoryResponse.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.ChangeDirectoryResponse.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeDirectoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeDirectoryResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.PrintWorkingDirectoryResponse.prototype.toObject =
		function (opt_includeInstance) {
			return proto.proto.sftp.PrintWorkingDirectoryResponse.toObject(
				opt_includeInstance,
				this,
			);
		};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.PrintWorkingDirectoryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.PrintWorkingDirectoryResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.PrintWorkingDirectoryResponse}
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.deserializeBinary = function (
	bytes,
) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.PrintWorkingDirectoryResponse();
	return proto.proto.sftp.PrintWorkingDirectoryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.PrintWorkingDirectoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.PrintWorkingDirectoryResponse}
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				case 1:
					var value = /** @type {string} */ (reader.readString());
					msg.setPath(value);
					break;
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.PrintWorkingDirectoryResponse.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.PrintWorkingDirectoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.serializeBinaryToWriter =
	function (message, writer) {
		var f = undefined;
		f = message.getPath();
		if (f.length > 0) {
			writer.writeString(1, f);
		}
	};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.PrintWorkingDirectoryResponse} returns this
 */
proto.proto.sftp.PrintWorkingDirectoryResponse.prototype.setPath = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeGroupResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeGroupResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeGroupResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeGroupResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeGroupResponse}
 */
proto.proto.sftp.ChangeGroupResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeGroupResponse();
	return proto.proto.sftp.ChangeGroupResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeGroupResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeGroupResponse}
 */
proto.proto.sftp.ChangeGroupResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeGroupResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeGroupResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeGroupResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeGroupResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeOwnerResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeOwnerResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeOwnerResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeOwnerResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeOwnerResponse}
 */
proto.proto.sftp.ChangeOwnerResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeOwnerResponse();
	return proto.proto.sftp.ChangeOwnerResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeOwnerResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeOwnerResponse}
 */
proto.proto.sftp.ChangeOwnerResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeOwnerResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeOwnerResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeOwnerResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeOwnerResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeModeResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeModeResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeModeResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeModeResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeModeResponse}
 */
proto.proto.sftp.ChangeModeResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeModeResponse();
	return proto.proto.sftp.ChangeModeResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeModeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeModeResponse}
 */
proto.proto.sftp.ChangeModeResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeModeResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ChangeModeResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeModeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeModeResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ChangeModifyTimeResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ChangeModifyTimeResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ChangeModifyTimeResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ChangeModifyTimeResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ChangeModifyTimeResponse}
 */
proto.proto.sftp.ChangeModifyTimeResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ChangeModifyTimeResponse();
	return proto.proto.sftp.ChangeModifyTimeResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ChangeModifyTimeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ChangeModifyTimeResponse}
 */
proto.proto.sftp.ChangeModifyTimeResponse.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ChangeModifyTimeResponse.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.ChangeModifyTimeResponse.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ChangeModifyTimeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ChangeModifyTimeResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.MakeDirectoryResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.MakeDirectoryResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.MakeDirectoryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.MakeDirectoryResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.MakeDirectoryResponse}
 */
proto.proto.sftp.MakeDirectoryResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.MakeDirectoryResponse();
	return proto.proto.sftp.MakeDirectoryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.MakeDirectoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.MakeDirectoryResponse}
 */
proto.proto.sftp.MakeDirectoryResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.MakeDirectoryResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.MakeDirectoryResponse.serializeBinaryToWriter(
		this,
		writer,
	);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.MakeDirectoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.MakeDirectoryResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RemoveDirectoryResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RemoveDirectoryResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RemoveDirectoryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RemoveDirectoryResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RemoveDirectoryResponse}
 */
proto.proto.sftp.RemoveDirectoryResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RemoveDirectoryResponse();
	return proto.proto.sftp.RemoveDirectoryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RemoveDirectoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RemoveDirectoryResponse}
 */
proto.proto.sftp.RemoveDirectoryResponse.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RemoveDirectoryResponse.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.RemoveDirectoryResponse.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RemoveDirectoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RemoveDirectoryResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RemoveFileResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RemoveFileResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RemoveFileResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RemoveFileResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RemoveFileResponse}
 */
proto.proto.sftp.RemoveFileResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RemoveFileResponse();
	return proto.proto.sftp.RemoveFileResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RemoveFileResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RemoveFileResponse}
 */
proto.proto.sftp.RemoveFileResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RemoveFileResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.RemoveFileResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RemoveFileResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RemoveFileResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.RenameResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.RenameResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.RenameResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.RenameResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.RenameResponse}
 */
proto.proto.sftp.RenameResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.RenameResponse();
	return proto.proto.sftp.RenameResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.RenameResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.RenameResponse}
 */
proto.proto.sftp.RenameResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.RenameResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.RenameResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.RenameResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.RenameResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.SymbolicLinkResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.SymbolicLinkResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.SymbolicLinkResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.SymbolicLinkResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.SymbolicLinkResponse}
 */
proto.proto.sftp.SymbolicLinkResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.SymbolicLinkResponse();
	return proto.proto.sftp.SymbolicLinkResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.SymbolicLinkResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.SymbolicLinkResponse}
 */
proto.proto.sftp.SymbolicLinkResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.SymbolicLinkResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.SymbolicLinkResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.SymbolicLinkResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.SymbolicLinkResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.sftp.ListDirectoryResponse.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ListDirectoryResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ListDirectoryResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ListDirectoryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ListDirectoryResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				entryList: jspb.Message.toObjectList(
					msg.getEntryList(),
					proto.proto.sftp.EntryResponse.toObject,
					includeInstance,
				),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ListDirectoryResponse}
 */
proto.proto.sftp.ListDirectoryResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ListDirectoryResponse();
	return proto.proto.sftp.ListDirectoryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ListDirectoryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ListDirectoryResponse}
 */
proto.proto.sftp.ListDirectoryResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.EntryResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.EntryResponse.deserializeBinaryFromReader,
				);
				msg.addEntry(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ListDirectoryResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ListDirectoryResponse.serializeBinaryToWriter(
		this,
		writer,
	);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ListDirectoryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ListDirectoryResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getEntryList();
	if (f.length > 0) {
		writer.writeRepeatedMessage(
			1,
			f,
			proto.proto.sftp.EntryResponse.serializeBinaryToWriter,
		);
	}
};

/**
 * repeated EntryResponse Entry = 1;
 * @return {!Array<!proto.proto.sftp.EntryResponse>}
 */
proto.proto.sftp.ListDirectoryResponse.prototype.getEntryList = function () {
	return /** @type{!Array<!proto.proto.sftp.EntryResponse>} */ (
		jspb.Message.getRepeatedWrapperField(
			this,
			proto.proto.sftp.EntryResponse,
			1,
		)
	);
};

/**
 * @param {!Array<!proto.proto.sftp.EntryResponse>} value
 * @return {!proto.proto.sftp.ListDirectoryResponse} returns this
 */
proto.proto.sftp.ListDirectoryResponse.prototype.setEntryList = function (
	value,
) {
	return jspb.Message.setRepeatedWrapperField(this, 1, value);
};

/**
 * @param {!proto.proto.sftp.EntryResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.sftp.EntryResponse}
 */
proto.proto.sftp.ListDirectoryResponse.prototype.addEntry = function (
	opt_value,
	opt_index,
) {
	return jspb.Message.addToRepeatedWrapperField(
		this,
		1,
		opt_value,
		proto.proto.sftp.EntryResponse,
		opt_index,
	);
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.proto.sftp.ListDirectoryResponse} returns this
 */
proto.proto.sftp.ListDirectoryResponse.prototype.clearEntryList = function () {
	return this.setEntryList([]);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.EntryResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.EntryResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.EntryResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.EntryResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				longname: jspb.Message.getFieldWithDefault(msg, 1, ''),
				filename: jspb.Message.getFieldWithDefault(msg, 2, ''),
				attributes:
					(f = msg.getAttributes()) &&
					proto.proto.sftp.AttributesResponse.toObject(
						includeInstance,
						f,
					),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.EntryResponse}
 */
proto.proto.sftp.EntryResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.EntryResponse();
	return proto.proto.sftp.EntryResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.EntryResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.EntryResponse}
 */
proto.proto.sftp.EntryResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setLongname(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setFilename(value);
				break;
			case 3:
				var value = new proto.proto.sftp.AttributesResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.AttributesResponse
						.deserializeBinaryFromReader,
				);
				msg.setAttributes(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.EntryResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.EntryResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.EntryResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.EntryResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getLongname();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getFilename();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getAttributes();
	if (f != null) {
		writer.writeMessage(
			3,
			f,
			proto.proto.sftp.AttributesResponse.serializeBinaryToWriter,
		);
	}
};

/**
 * optional string longName = 1;
 * @return {string}
 */
proto.proto.sftp.EntryResponse.prototype.getLongname = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.EntryResponse} returns this
 */
proto.proto.sftp.EntryResponse.prototype.setLongname = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string fileName = 2;
 * @return {string}
 */
proto.proto.sftp.EntryResponse.prototype.getFilename = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.EntryResponse} returns this
 */
proto.proto.sftp.EntryResponse.prototype.setFilename = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional AttributesResponse attributes = 3;
 * @return {?proto.proto.sftp.AttributesResponse}
 */
proto.proto.sftp.EntryResponse.prototype.getAttributes = function () {
	return /** @type{?proto.proto.sftp.AttributesResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.AttributesResponse,
			3,
		)
	);
};

/**
 * @param {?proto.proto.sftp.AttributesResponse|undefined} value
 * @return {!proto.proto.sftp.EntryResponse} returns this
 */
proto.proto.sftp.EntryResponse.prototype.setAttributes = function (value) {
	return jspb.Message.setWrapperField(this, 3, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.EntryResponse} returns this
 */
proto.proto.sftp.EntryResponse.prototype.clearAttributes = function () {
	return this.setAttributes(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.EntryResponse.prototype.hasAttributes = function () {
	return jspb.Message.getField(this, 3) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.StatusResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.StatusResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.StatusResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.StatusResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				attributes:
					(f = msg.getAttributes()) &&
					proto.proto.sftp.AttributesResponse.toObject(
						includeInstance,
						f,
					),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.StatusResponse}
 */
proto.proto.sftp.StatusResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.StatusResponse();
	return proto.proto.sftp.StatusResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.StatusResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.StatusResponse}
 */
proto.proto.sftp.StatusResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.AttributesResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.AttributesResponse
						.deserializeBinaryFromReader,
				);
				msg.setAttributes(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.StatusResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.StatusResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.StatusResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.StatusResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getAttributes();
	if (f != null) {
		writer.writeMessage(
			1,
			f,
			proto.proto.sftp.AttributesResponse.serializeBinaryToWriter,
		);
	}
};

/**
 * optional AttributesResponse attributes = 1;
 * @return {?proto.proto.sftp.AttributesResponse}
 */
proto.proto.sftp.StatusResponse.prototype.getAttributes = function () {
	return /** @type{?proto.proto.sftp.AttributesResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.AttributesResponse,
			1,
		)
	);
};

/**
 * @param {?proto.proto.sftp.AttributesResponse|undefined} value
 * @return {!proto.proto.sftp.StatusResponse} returns this
 */
proto.proto.sftp.StatusResponse.prototype.setAttributes = function (value) {
	return jspb.Message.setWrapperField(this, 1, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.StatusResponse} returns this
 */
proto.proto.sftp.StatusResponse.prototype.clearAttributes = function () {
	return this.setAttributes(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.StatusResponse.prototype.hasAttributes = function () {
	return jspb.Message.getField(this, 1) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.LinkStatusResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.LinkStatusResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.LinkStatusResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.LinkStatusResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				attributes:
					(f = msg.getAttributes()) &&
					proto.proto.sftp.AttributesResponse.toObject(
						includeInstance,
						f,
					),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.LinkStatusResponse}
 */
proto.proto.sftp.LinkStatusResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.LinkStatusResponse();
	return proto.proto.sftp.LinkStatusResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.LinkStatusResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.LinkStatusResponse}
 */
proto.proto.sftp.LinkStatusResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = new proto.proto.sftp.AttributesResponse();
				reader.readMessage(
					value,
					proto.proto.sftp.AttributesResponse
						.deserializeBinaryFromReader,
				);
				msg.setAttributes(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.LinkStatusResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.LinkStatusResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.LinkStatusResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.LinkStatusResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getAttributes();
	if (f != null) {
		writer.writeMessage(
			1,
			f,
			proto.proto.sftp.AttributesResponse.serializeBinaryToWriter,
		);
	}
};

/**
 * optional AttributesResponse attributes = 1;
 * @return {?proto.proto.sftp.AttributesResponse}
 */
proto.proto.sftp.LinkStatusResponse.prototype.getAttributes = function () {
	return /** @type{?proto.proto.sftp.AttributesResponse} */ (
		jspb.Message.getWrapperField(
			this,
			proto.proto.sftp.AttributesResponse,
			1,
		)
	);
};

/**
 * @param {?proto.proto.sftp.AttributesResponse|undefined} value
 * @return {!proto.proto.sftp.LinkStatusResponse} returns this
 */
proto.proto.sftp.LinkStatusResponse.prototype.setAttributes = function (value) {
	return jspb.Message.setWrapperField(this, 1, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.sftp.LinkStatusResponse} returns this
 */
proto.proto.sftp.LinkStatusResponse.prototype.clearAttributes = function () {
	return this.setAttributes(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.sftp.LinkStatusResponse.prototype.hasAttributes = function () {
	return jspb.Message.getField(this, 1) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.AttributesResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.AttributesResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.AttributesResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.AttributesResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				uid: jspb.Message.getFieldWithDefault(msg, 1, 0),
				gid: jspb.Message.getFieldWithDefault(msg, 2, 0),
				permissions: jspb.Message.getFieldWithDefault(msg, 3, 0),
				permissionsstring: jspb.Message.getFieldWithDefault(msg, 4, ''),
				mtime: jspb.Message.getFieldWithDefault(msg, 5, 0),
				mtimestring: jspb.Message.getFieldWithDefault(msg, 6, ''),
				atime: jspb.Message.getFieldWithDefault(msg, 7, 0),
				atimestring: jspb.Message.getFieldWithDefault(msg, 8, ''),
				size: jspb.Message.getFieldWithDefault(msg, 9, 0),
				link: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
				dir: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
				reg: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.AttributesResponse}
 */
proto.proto.sftp.AttributesResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.AttributesResponse();
	return proto.proto.sftp.AttributesResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.AttributesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.AttributesResponse}
 */
proto.proto.sftp.AttributesResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setUid(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setGid(value);
				break;
			case 3:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setPermissions(value);
				break;
			case 4:
				var value = /** @type {string} */ (reader.readString());
				msg.setPermissionsstring(value);
				break;
			case 5:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setMtime(value);
				break;
			case 6:
				var value = /** @type {string} */ (reader.readString());
				msg.setMtimestring(value);
				break;
			case 7:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setAtime(value);
				break;
			case 8:
				var value = /** @type {string} */ (reader.readString());
				msg.setAtimestring(value);
				break;
			case 9:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setSize(value);
				break;
			case 10:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setLink(value);
				break;
			case 11:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setDir(value);
				break;
			case 12:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setReg(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.AttributesResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.AttributesResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.AttributesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.AttributesResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getUid();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getGid();
	if (f !== 0) {
		writer.writeInt32(2, f);
	}
	f = message.getPermissions();
	if (f !== 0) {
		writer.writeInt32(3, f);
	}
	f = message.getPermissionsstring();
	if (f.length > 0) {
		writer.writeString(4, f);
	}
	f = message.getMtime();
	if (f !== 0) {
		writer.writeInt32(5, f);
	}
	f = message.getMtimestring();
	if (f.length > 0) {
		writer.writeString(6, f);
	}
	f = message.getAtime();
	if (f !== 0) {
		writer.writeInt32(7, f);
	}
	f = message.getAtimestring();
	if (f.length > 0) {
		writer.writeString(8, f);
	}
	f = message.getSize();
	if (f !== 0) {
		writer.writeInt64(9, f);
	}
	f = message.getLink();
	if (f) {
		writer.writeBool(10, f);
	}
	f = message.getDir();
	if (f) {
		writer.writeBool(11, f);
	}
	f = message.getReg();
	if (f) {
		writer.writeBool(12, f);
	}
};

/**
 * optional int32 uid = 1;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getUid = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setUid = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional int32 gid = 2;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getGid = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setGid = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional int32 permissions = 3;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getPermissions = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setPermissions = function (
	value,
) {
	return jspb.Message.setProto3IntField(this, 3, value);
};

/**
 * optional string permissionsString = 4;
 * @return {string}
 */
proto.proto.sftp.AttributesResponse.prototype.getPermissionsstring =
	function () {
		return /** @type {string} */ (
			jspb.Message.getFieldWithDefault(this, 4, '')
		);
	};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setPermissionsstring = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * optional int32 mtime = 5;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getMtime = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setMtime = function (value) {
	return jspb.Message.setProto3IntField(this, 5, value);
};

/**
 * optional string mtimeString = 6;
 * @return {string}
 */
proto.proto.sftp.AttributesResponse.prototype.getMtimestring = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 6, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setMtimestring = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 6, value);
};

/**
 * optional int32 atime = 7;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getAtime = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setAtime = function (value) {
	return jspb.Message.setProto3IntField(this, 7, value);
};

/**
 * optional string atimeString = 8;
 * @return {string}
 */
proto.proto.sftp.AttributesResponse.prototype.getAtimestring = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 8, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setAtimestring = function (
	value,
) {
	return jspb.Message.setProto3StringField(this, 8, value);
};

/**
 * optional int64 size = 9;
 * @return {number}
 */
proto.proto.sftp.AttributesResponse.prototype.getSize = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setSize = function (value) {
	return jspb.Message.setProto3IntField(this, 9, value);
};

/**
 * optional bool link = 10;
 * @return {boolean}
 */
proto.proto.sftp.AttributesResponse.prototype.getLink = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 10, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setLink = function (value) {
	return jspb.Message.setProto3BooleanField(this, 10, value);
};

/**
 * optional bool dir = 11;
 * @return {boolean}
 */
proto.proto.sftp.AttributesResponse.prototype.getDir = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 11, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setDir = function (value) {
	return jspb.Message.setProto3BooleanField(this, 11, value);
};

/**
 * optional bool reg = 12;
 * @return {boolean}
 */
proto.proto.sftp.AttributesResponse.prototype.getReg = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 12, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.AttributesResponse} returns this
 */
proto.proto.sftp.AttributesResponse.prototype.setReg = function (value) {
	return jspb.Message.setProto3BooleanField(this, 12, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.toObject =
		function (opt_includeInstance) {
			return proto.proto.sftp.VirtualFileSystemStatusResponse.toObject(
				opt_includeInstance,
				this,
			);
		};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.VirtualFileSystemStatusResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.VirtualFileSystemStatusResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				filesystemid: jspb.Message.getFieldWithDefault(msg, 1, 0),
				blocks: jspb.Message.getFieldWithDefault(msg, 2, 0),
				availblocks: jspb.Message.getFieldWithDefault(msg, 3, 0),
				freeblocks: jspb.Message.getFieldWithDefault(msg, 4, 0),
				fragmentsize: jspb.Message.getFieldWithDefault(msg, 5, 0),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.deserializeBinary = function (
	bytes,
) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.VirtualFileSystemStatusResponse();
	return proto.proto.sftp.VirtualFileSystemStatusResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.VirtualFileSystemStatusResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.deserializeBinaryFromReader =
	function (msg, reader) {
		while (reader.nextField()) {
			if (reader.isEndGroup()) {
				break;
			}
			var field = reader.getFieldNumber();
			switch (field) {
				case 1:
					var value = /** @type {number} */ (reader.readInt64());
					msg.setFilesystemid(value);
					break;
				case 2:
					var value = /** @type {number} */ (reader.readInt64());
					msg.setBlocks(value);
					break;
				case 3:
					var value = /** @type {number} */ (reader.readInt64());
					msg.setAvailblocks(value);
					break;
				case 4:
					var value = /** @type {number} */ (reader.readInt64());
					msg.setFreeblocks(value);
					break;
				case 5:
					var value = /** @type {number} */ (reader.readInt64());
					msg.setFragmentsize(value);
					break;
				default:
					reader.skipField();
					break;
			}
		}
		return msg;
	};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.serializeBinary =
	function () {
		var writer = new jspb.BinaryWriter();
		proto.proto.sftp.VirtualFileSystemStatusResponse.serializeBinaryToWriter(
			this,
			writer,
		);
		return writer.getResultBuffer();
	};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.VirtualFileSystemStatusResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.serializeBinaryToWriter =
	function (message, writer) {
		var f = undefined;
		f = message.getFilesystemid();
		if (f !== 0) {
			writer.writeInt64(1, f);
		}
		f = message.getBlocks();
		if (f !== 0) {
			writer.writeInt64(2, f);
		}
		f = message.getAvailblocks();
		if (f !== 0) {
			writer.writeInt64(3, f);
		}
		f = message.getFreeblocks();
		if (f !== 0) {
			writer.writeInt64(4, f);
		}
		f = message.getFragmentsize();
		if (f !== 0) {
			writer.writeInt64(5, f);
		}
	};

/**
 * optional int64 fileSystemID = 1;
 * @return {number}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.getFilesystemid =
	function () {
		return /** @type {number} */ (
			jspb.Message.getFieldWithDefault(this, 1, 0)
		);
	};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.setFilesystemid =
	function (value) {
		return jspb.Message.setProto3IntField(this, 1, value);
	};

/**
 * optional int64 blocks = 2;
 * @return {number}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.getBlocks =
	function () {
		return /** @type {number} */ (
			jspb.Message.getFieldWithDefault(this, 2, 0)
		);
	};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.setBlocks =
	function (value) {
		return jspb.Message.setProto3IntField(this, 2, value);
	};

/**
 * optional int64 availBlocks = 3;
 * @return {number}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.getAvailblocks =
	function () {
		return /** @type {number} */ (
			jspb.Message.getFieldWithDefault(this, 3, 0)
		);
	};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.setAvailblocks =
	function (value) {
		return jspb.Message.setProto3IntField(this, 3, value);
	};

/**
 * optional int64 freeBlocks = 4;
 * @return {number}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.getFreeblocks =
	function () {
		return /** @type {number} */ (
			jspb.Message.getFieldWithDefault(this, 4, 0)
		);
	};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.setFreeblocks =
	function (value) {
		return jspb.Message.setProto3IntField(this, 4, value);
	};

/**
 * optional int64 fragmentSize = 5;
 * @return {number}
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.getFragmentsize =
	function () {
		return /** @type {number} */ (
			jspb.Message.getFieldWithDefault(this, 5, 0)
		);
	};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.VirtualFileSystemStatusResponse} returns this
 */
proto.proto.sftp.VirtualFileSystemStatusResponse.prototype.setFragmentsize =
	function (value) {
		return jspb.Message.setProto3IntField(this, 5, value);
	};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ReadLinkResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ReadLinkResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ReadLinkResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ReadLinkResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				path: jspb.Message.getFieldWithDefault(msg, 1, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ReadLinkResponse}
 */
proto.proto.sftp.ReadLinkResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ReadLinkResponse();
	return proto.proto.sftp.ReadLinkResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ReadLinkResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ReadLinkResponse}
 */
proto.proto.sftp.ReadLinkResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPath(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ReadLinkResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ReadLinkResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ReadLinkResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ReadLinkResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPath();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
};

/**
 * optional string path = 1;
 * @return {string}
 */
proto.proto.sftp.ReadLinkResponse.prototype.getPath = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ReadLinkResponse} returns this
 */
proto.proto.sftp.ReadLinkResponse.prototype.setPath = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.PutResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.PutResponse.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.PutResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.PutResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				progress: jspb.Message.getFieldWithDefault(msg, 1, 0),
				last: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.PutResponse}
 */
proto.proto.sftp.PutResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.PutResponse();
	return proto.proto.sftp.PutResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.PutResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.PutResponse}
 */
proto.proto.sftp.PutResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setProgress(value);
				break;
			case 2:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setLast(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.PutResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.PutResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.PutResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.PutResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getProgress();
	if (f !== 0) {
		writer.writeInt64(1, f);
	}
	f = message.getLast();
	if (f) {
		writer.writeBool(2, f);
	}
};

/**
 * optional int64 progress = 1;
 * @return {number}
 */
proto.proto.sftp.PutResponse.prototype.getProgress = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.PutResponse} returns this
 */
proto.proto.sftp.PutResponse.prototype.setProgress = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional bool last = 2;
 * @return {boolean}
 */
proto.proto.sftp.PutResponse.prototype.getLast = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 2, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.PutResponse} returns this
 */
proto.proto.sftp.PutResponse.prototype.setLast = function (value) {
	return jspb.Message.setProto3BooleanField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.GetResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.GetResponse.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.GetResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.GetResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				offset: jspb.Message.getFieldWithDefault(msg, 1, 0),
				filesize: jspb.Message.getFieldWithDefault(msg, 2, 0),
				data: msg.getData_asB64(),
				last: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.GetResponse}
 */
proto.proto.sftp.GetResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.GetResponse();
	return proto.proto.sftp.GetResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.GetResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.GetResponse}
 */
proto.proto.sftp.GetResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setOffset(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt64());
				msg.setFilesize(value);
				break;
			case 3:
				var value = /** @type {!Uint8Array} */ (reader.readBytes());
				msg.setData(value);
				break;
			case 4:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setLast(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.GetResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.GetResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.GetResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.GetResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getOffset();
	if (f !== 0) {
		writer.writeInt64(1, f);
	}
	f = message.getFilesize();
	if (f !== 0) {
		writer.writeInt64(2, f);
	}
	f = message.getData_asU8();
	if (f.length > 0) {
		writer.writeBytes(3, f);
	}
	f = message.getLast();
	if (f) {
		writer.writeBool(4, f);
	}
};

/**
 * optional int64 offset = 1;
 * @return {number}
 */
proto.proto.sftp.GetResponse.prototype.getOffset = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.GetResponse} returns this
 */
proto.proto.sftp.GetResponse.prototype.setOffset = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional int64 fileSize = 2;
 * @return {number}
 */
proto.proto.sftp.GetResponse.prototype.getFilesize = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.GetResponse} returns this
 */
proto.proto.sftp.GetResponse.prototype.setFilesize = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional bytes resourceGroupId = 3;
 * @return {!(string|Uint8Array)}
 */
proto.proto.sftp.GetResponse.prototype.getData = function () {
	return /** @type {!(string|Uint8Array)} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * optional bytes resourceGroupId = 3;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.proto.sftp.GetResponse.prototype.getData_asB64 = function () {
	return /** @type {string} */ (jspb.Message.bytesAsB64(this.getData()));
};

/**
 * optional bytes resourceGroupId = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.proto.sftp.GetResponse.prototype.getData_asU8 = function () {
	return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getData()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.proto.sftp.GetResponse} returns this
 */
proto.proto.sftp.GetResponse.prototype.setData = function (value) {
	return jspb.Message.setProto3BytesField(this, 3, value);
};

/**
 * optional bool last = 4;
 * @return {boolean}
 */
proto.proto.sftp.GetResponse.prototype.getLast = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 4, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.GetResponse} returns this
 */
proto.proto.sftp.GetResponse.prototype.setLast = function (value) {
	return jspb.Message.setProto3BooleanField(this, 4, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ReadFileResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ReadFileResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ReadFileResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ReadFileResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				readbytes: jspb.Message.getFieldWithDefault(msg, 1, 0),
				data: msg.getData_asB64(),
				completed: jspb.Message.getBooleanFieldWithDefault(
					msg,
					3,
					false,
				),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ReadFileResponse}
 */
proto.proto.sftp.ReadFileResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ReadFileResponse();
	return proto.proto.sftp.ReadFileResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ReadFileResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ReadFileResponse}
 */
proto.proto.sftp.ReadFileResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setReadbytes(value);
				break;
			case 2:
				var value = /** @type {!Uint8Array} */ (reader.readBytes());
				msg.setData(value);
				break;
			case 3:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setCompleted(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ReadFileResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ReadFileResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ReadFileResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ReadFileResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getReadbytes();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getData_asU8();
	if (f.length > 0) {
		writer.writeBytes(2, f);
	}
	f = message.getCompleted();
	if (f) {
		writer.writeBool(3, f);
	}
};

/**
 * optional int32 readBytes = 1;
 * @return {number}
 */
proto.proto.sftp.ReadFileResponse.prototype.getReadbytes = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ReadFileResponse} returns this
 */
proto.proto.sftp.ReadFileResponse.prototype.setReadbytes = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional bytes resourceGroupId = 2;
 * @return {!(string|Uint8Array)}
 */
proto.proto.sftp.ReadFileResponse.prototype.getData = function () {
	return /** @type {!(string|Uint8Array)} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * optional bytes resourceGroupId = 2;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.proto.sftp.ReadFileResponse.prototype.getData_asB64 = function () {
	return /** @type {string} */ (jspb.Message.bytesAsB64(this.getData()));
};

/**
 * optional bytes resourceGroupId = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.proto.sftp.ReadFileResponse.prototype.getData_asU8 = function () {
	return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getData()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.proto.sftp.ReadFileResponse} returns this
 */
proto.proto.sftp.ReadFileResponse.prototype.setData = function (value) {
	return jspb.Message.setProto3BytesField(this, 2, value);
};

/**
 * optional bool completed = 3;
 * @return {boolean}
 */
proto.proto.sftp.ReadFileResponse.prototype.getCompleted = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 3, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.ReadFileResponse} returns this
 */
proto.proto.sftp.ReadFileResponse.prototype.setCompleted = function (value) {
	return jspb.Message.setProto3BooleanField(this, 3, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.WriteFileResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.WriteFileResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.WriteFileResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.WriteFileResponse.toObject = function (
		includeInstance,
		msg,
	) {
		var f,
			obj = {
				writebytes: jspb.Message.getFieldWithDefault(msg, 1, 0),
				completed: jspb.Message.getBooleanFieldWithDefault(
					msg,
					2,
					false,
				),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.WriteFileResponse}
 */
proto.proto.sftp.WriteFileResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.WriteFileResponse();
	return proto.proto.sftp.WriteFileResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.WriteFileResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.WriteFileResponse}
 */
proto.proto.sftp.WriteFileResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setWritebytes(value);
				break;
			case 2:
				var value = /** @type {boolean} */ (reader.readBool());
				msg.setCompleted(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.WriteFileResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.WriteFileResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.WriteFileResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.WriteFileResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getWritebytes();
	if (f !== 0) {
		writer.writeInt32(1, f);
	}
	f = message.getCompleted();
	if (f) {
		writer.writeBool(2, f);
	}
};

/**
 * optional int32 writeBytes = 1;
 * @return {number}
 */
proto.proto.sftp.WriteFileResponse.prototype.getWritebytes = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.WriteFileResponse} returns this
 */
proto.proto.sftp.WriteFileResponse.prototype.setWritebytes = function (value) {
	return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional bool completed = 2;
 * @return {boolean}
 */
proto.proto.sftp.WriteFileResponse.prototype.getCompleted = function () {
	return /** @type {boolean} */ (
		jspb.Message.getBooleanFieldWithDefault(this, 2, false)
	);
};

/**
 * @param {boolean} value
 * @return {!proto.proto.sftp.WriteFileResponse} returns this
 */
proto.proto.sftp.WriteFileResponse.prototype.setCompleted = function (value) {
	return jspb.Message.setProto3BooleanField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ExitResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ExitResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ExitResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ExitResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ExitResponse}
 */
proto.proto.sftp.ExitResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ExitResponse();
	return proto.proto.sftp.ExitResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ExitResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ExitResponse}
 */
proto.proto.sftp.ExitResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ExitResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ExitResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ExitResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ExitResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.QuitResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.QuitResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.QuitResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.QuitResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.QuitResponse}
 */
proto.proto.sftp.QuitResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.QuitResponse();
	return proto.proto.sftp.QuitResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.QuitResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.QuitResponse}
 */
proto.proto.sftp.QuitResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.QuitResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.QuitResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.QuitResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.QuitResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.proto.sftp.ErrorResponse.prototype.toObject = function (
		opt_includeInstance,
	) {
		return proto.proto.sftp.ErrorResponse.toObject(
			opt_includeInstance,
			this,
		);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.proto.sftp.ErrorResponse} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.proto.sftp.ErrorResponse.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				prefix: jspb.Message.getFieldWithDefault(msg, 1, ''),
				serialnumber: jspb.Message.getFieldWithDefault(msg, 2, 0),
				message: jspb.Message.getFieldWithDefault(msg, 3, ''),
				format: jspb.Message.getFieldWithDefault(msg, 4, ''),
				attributeMap: (f = msg.getAttributeMap())
					? f.toObject(includeInstance, undefined)
					: [],
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary resourceGroupId (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.sftp.ErrorResponse}
 */
proto.proto.sftp.ErrorResponse.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.proto.sftp.ErrorResponse();
	return proto.proto.sftp.ErrorResponse.deserializeBinaryFromReader(
		msg,
		reader,
	);
};

/**
 * Deserializes binary resourceGroupId (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.sftp.ErrorResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.sftp.ErrorResponse}
 */
proto.proto.sftp.ErrorResponse.deserializeBinaryFromReader = function (
	msg,
	reader,
) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setPrefix(value);
				break;
			case 2:
				var value = /** @type {number} */ (reader.readInt32());
				msg.setSerialnumber(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setMessage(value);
				break;
			case 4:
				var value = /** @type {string} */ (reader.readString());
				msg.setFormat(value);
				break;
			case 5:
				var value = msg.getAttributeMap();
				reader.readMessage(value, function (message, reader) {
					jspb.Map.deserializeBinary(
						message,
						reader,
						jspb.BinaryReader.prototype.readString,
						jspb.BinaryReader.prototype.readString,
						null,
						'',
						'',
					);
				});
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary resourceGroupId (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.sftp.ErrorResponse.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.proto.sftp.ErrorResponse.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary resourceGroupId (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.sftp.ErrorResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.sftp.ErrorResponse.serializeBinaryToWriter = function (
	message,
	writer,
) {
	var f = undefined;
	f = message.getPrefix();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getSerialnumber();
	if (f !== 0) {
		writer.writeInt32(2, f);
	}
	f = message.getMessage();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
	f = message.getFormat();
	if (f.length > 0) {
		writer.writeString(4, f);
	}
	f = message.getAttributeMap(true);
	if (f && f.getLength() > 0) {
		f.serializeBinary(
			5,
			writer,
			jspb.BinaryWriter.prototype.writeString,
			jspb.BinaryWriter.prototype.writeString,
		);
	}
};

/**
 * optional string prefix = 1;
 * @return {string}
 */
proto.proto.sftp.ErrorResponse.prototype.getPrefix = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ErrorResponse} returns this
 */
proto.proto.sftp.ErrorResponse.prototype.setPrefix = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int32 serialNumber = 2;
 * @return {number}
 */
proto.proto.sftp.ErrorResponse.prototype.getSerialnumber = function () {
	return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.proto.sftp.ErrorResponse} returns this
 */
proto.proto.sftp.ErrorResponse.prototype.setSerialnumber = function (value) {
	return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional string message = 3;
 * @return {string}
 */
proto.proto.sftp.ErrorResponse.prototype.getMessage = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ErrorResponse} returns this
 */
proto.proto.sftp.ErrorResponse.prototype.setMessage = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string format = 4;
 * @return {string}
 */
proto.proto.sftp.ErrorResponse.prototype.getFormat = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 4, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.proto.sftp.ErrorResponse} returns this
 */
proto.proto.sftp.ErrorResponse.prototype.setFormat = function (value) {
	return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * map<string, string> attribute = 5;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.proto.sftp.ErrorResponse.prototype.getAttributeMap = function (
	opt_noLazyCreate,
) {
	return /** @type {!jspb.Map<string,string>} */ (
		jspb.Message.getMapField(this, 5, opt_noLazyCreate, null)
	);
};

/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.proto.sftp.ErrorResponse} returns this
 */
proto.proto.sftp.ErrorResponse.prototype.clearAttributeMap = function () {
	this.getAttributeMap().clear();
	return this;
};

goog.object.extend(exports, proto.proto.sftp);
