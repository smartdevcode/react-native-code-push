"use strict";

import React from "react-native";
import CodePush from "react-native-code-push";
const NativeCodePush = React.NativeModules.CodePush;
import createTestCaseComponent from "../../utils/createTestCaseComponent";
const PackageMixins = require("react-native-code-push/package-mixins.js")(NativeCodePush);
import assert from "assert";
import createMockAcquisitionSdk from "../../utils/mockAcquisitionSdk";

import { serverPackage } from "../resources/testPackages";
const localPackage = {};

const deploymentKey = "myKey123";

let SwitchDeploymentKeyTest = createTestCaseComponent(
  "SwitchDeploymentKeyTest",
  "should check for an update under the specified deployment key",
  () => {
    let mockAcquisitionSdk = createMockAcquisitionSdk(serverPackage, localPackage, deploymentKey);       
    let mockConfiguration = { appVersion : "1.5.0" };
    CodePush.setUpTestDependencies(mockAcquisitionSdk, mockConfiguration, NativeCodePush);
    CodePush.getCurrentPackage = async () => {
      return localPackage;
    };
  },
  async () => {
    let update = await CodePush.checkForUpdate(deploymentKey)
    assert.deepEqual(update, Object.assign(serverPackage, PackageMixins.remote), "checkForUpdate did not return the update from the server");
  }
);

export default SwitchDeploymentKeyTest;