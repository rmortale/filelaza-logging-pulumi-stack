import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { loggrp } from "./loggroup";
import { s3evttarget } from "./s3loggingrule";
import { flevttarget } from "./eventsloggingrule";

let config = new pulumi.Config();
let prefix = config.require("prefix");


export const logGroup = loggrp.id;
export const s3target = s3evttarget.id;
export const evttargetexp = flevttarget.id;
