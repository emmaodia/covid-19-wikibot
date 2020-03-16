/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  Survey = require("./survey"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Care {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "CARE_HELP":
        response = Response.genQuickReply(
          i18n.__("care.prompt", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("care.order"),
              payload: "CARE_ORDER"
            },
            {
              title: i18n.__("care.billing"),
              payload: "CARE_BILLING"
            },
            {
              title: i18n.__("care.other"),
              payload: "CARE_OTHER"
            }
          ]
        );
        break;
      case "CARE_ORDER":
        // Send using the Persona for order issues

        response =
          Response.genQuickReply(
            i18n.__("care.covid-19", {
              //userFirstName: this.user.firstName,
              //agentFirstName: config.personaOrder.name,
              //topic: i18n.__("care.order")
            }),
            [
              {
                title: i18n.__("care.billing"),
                payload: "CARE_BILLING"
              },
              {
                title: i18n.__("care.other"),
                payload: "CARE_OTHER"
              }
            ]
            //config.personaOrder.id
          );
          // Response.genTextWithPersona(
          //   i18n.__("care.end"),
          //   config.personaOrder.id
          // ),
          // Survey.genAgentRating(config.personaOrder.name)
        break;

      case "CARE_BILLING":
        // Send using the Persona for billing issues

        response =
          Response.genQuickReply(
            i18n.__("care.symptoms-19", {
              // userFirstName: this.user.firstName,
              // agentFirstName: config.personaBilling.name,
              // topic: i18n.__("care.billing")
            }),
            [
              {
                title: i18n.__("care.other"),
                payload: "CARE_OTHER"
              }
            ]
            //config.personaBilling.id
          );
          // Response.genTextWithPersona(
          //   i18n.__("care.end"),
          //   config.personaBilling.id
          // ),
          // Survey.genAgentRating(config.personaBilling.name)
        
        break;

      case "CARE_SALES":
        // Send using the Persona for sales questions

        response = [
          Response.genTextWithPersona(
            i18n.__("care.style", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaSales.name
            }),
            config.personaSales.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaSales.id
          ),
          Survey.genAgentRating(config.personaSales.name)
        ];
        break;

      case "CARE_OTHER":
        // Send using the Persona for customer care issues

        response = [
          Response.genTextWithPersona(
            i18n.__("curation.prompt", {
              // userFirstName: this.user.firstName,
              // agentFirstName: config.personaOrder.name,
              // topic: i18n.__("care.order")
            })
            ),
          Response.genGenericTemplate(
            `${config.appUrl}/styles/hand-washing-who.jpg`,
            i18n.__("curation.wash-hands"),
            i18n.__("curation.subtitle"),
            // `https://www.youtube.com/watch?v=y7e8nM0JAz0`,
            [
              Response.genWebUrlButton(
                i18n.__("curation.wash-hands-subtitle"),
                `${config.appUrl}/styles/wash-hands-video.mp4`,
              ),
              Response.genPostbackButton(
                i18n.__("curation.show"),
                "CURATION_OTHER_STYLE"
              )
            ]
          ),  
          Response.genQuickReply(i18n.__("curation.show"), [
            {
              title: i18n.__("curation.wash-hands"),
              payload: "CURATION_FOR_ME"
            },
            {
              title: i18n.__("curation.distance"),
              payload: "CURATION_SOMEONE_ELSE"
            }
          ]),  
        ]
      break;
    }

    return response;
  }
};
