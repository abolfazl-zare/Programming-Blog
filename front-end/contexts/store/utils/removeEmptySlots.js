import React from "react";
import transform from "lodash/transform";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";

export default function removeEmptySlots(obj) {
	return transform(obj, (item, value, key) => {
		if (isArray(value)) item[key] = removeEmptySlots(value.filter(() => true));
		else if (isObject(value) && !React.isValidElement(value) && !isFunction(value))
			item[key] = removeEmptySlots(value);
		else item[key] = value;
	});
}
