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
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Curation {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;
    let outfit;

    switch (payload) {
      
      case "CURATION":
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
              Response.genWebUrlButton(
                i18n.__("curation.show"),
                `${config.shopUrl}`,
              )
            ]
          ),  
          Response.genQuickReply("Kindly Click any button below to have more answers", [
            {
              title: i18n.__("curation.protect-self"),
              payload: "CURATION_FOR_ME"
            },
            {
              title: i18n.__("curation.stay-home"),
              payload: "CURATION_SOMEONE_ELSE"
            },
            {
              title: i18n.__("curation.stay-update"),
              payload: "CURATION_SOMEONE_ELSE"
            }
            // {
            //   title: i18n.__("curation.travel"),
            //   payload: "CURATION_SOMEONE_ELSE"
            // }
          ]),
        ]
        break;

      case "CURATION_FOR_ME":
        response =  [
          Response.genTextWithPersona(
          i18n.__("curation.protect", {
            // userFirstName: this.user.firstName,
            // agentFirstName: config.personaOrder.name,
            // topic: i18n.__("care.order")
          })
          ),
        Response.genGenericTemplate(
          `${config.appUrl}/styles/be-smart-inform.jpg`,
          i18n.__("curation.be-smart"),
          i18n.__("curation.subtitle"),
          // `https://www.youtube.com/watch?v=y7e8nM0JAz0`,
          [
            Response.genWebUrlButton(
              i18n.__("curation.wash-hands-subtitle"),
              `${config.appUrl}/styles/covid19.mp4`,
            )
          ]
        ),  
        
        Response.genQuickReply(i18n.__("curation.occasion"), [
          {
            title: i18n.__("curation.work"),
            payload: "CURATION_OCASION_WORK"
          },
          // {
          //   title: i18n.__("curation.dinner"),
          //   payload: "CURATION_OCASION_DINNER"
          // },
          // {
          //   title: i18n.__("curation.party"),
          //   payload: "CURATION_OCASION_PARTY"
          // },
          {
            title: i18n.__("curation.sales"),
            payload: "CURATION_BUDGET_20_PARTY"
          }
        ])
      ]
        break;

      case "CURATION_SOMEONE_ELSE":
        response = Response.genGenericTemplate(
          `${config.appUrl}/styles/myths.jpg`,
          i18n.__("curation.be-smart"),
          i18n.__("curation.subtitle"),
          // `https://www.youtube.com/watch?v=y7e8nM0JAz0`,
          [
            Response.genWebUrlButton(
              i18n.__("curation.wash-hands-subtitle"),
              `${config.appUrl}/styles/myths.mp4`,
            ),
            Response.genWebUrlButton(
              i18n.__("curation.show"),
              `${config.shopUrl}/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters`,
            )
          ]
        );
        break;

      case "CURATION_OCASION_WORK":
        // Store the user budget preference here
        response = Response.genQuickReply(i18n.__("curation.price"), [
          {
            title: "Start",
            payload: "CURATION_BUDGET_20_WORK"
          }
        ]);
        break;

      case "CURATION_BUDGET_20_WORK":
        response = Response.genQuickReply(i18n.__("curation.symptoms"), [
          {
            title: "YES",
            payload: "CURATION_BUDGET_30_WORK"
          },
          {
            title: "No",
            payload: "CURATION_BUDGET_50_WORK"
          }
        ]);
        break;

      case "CURATION_BUDGET_30_WORK":
        response = Response.genQuickReply(i18n.__("curation.fever"), [
          {
            title: "YES",
            payload: "CURATION_OCASION_DINNER"
          },
          {
            title: "No",
            payload: "CURATION_BUDGET_50_WORK"
          }
        ]);
        break;

        case "CURATION_OCASION_DINNER":
          // Store the user budget preference here
          response = Response.genQuickReply(i18n.__("curation.travel"), [
            {
              title: "Yes",
              payload: "CURATION_OCASION_PARTY"
            },
            {
              title: "No",
              payload: "CURATION_BUDGET_50_WORK"
            }
          ]);
          break;
  
        case "CURATION_OCASION_PARTY":
          // Store the user budget preference here
          response = Response.genQuickReply(i18n.__("curation.crowd"), [
            {
              title: "Yes",
              payload: "CURATION_OCASION_HOME"
            },
            {
              title: "No",
              payload: "CURATION_BUDGET_50_WORK"
            }
          ]);
          break;

          case "CURATION_OCASION_HOME":
            // Store the user budget preference here
            response = Response.genQuickReply(i18n.__("curation.contact"), [
              {
                title: "Contact CDC",
                payload: "CURATION_BUDGET_20_PARTY"
              },
              {
                title: "No",
                payload: "CURATION_BUDGET_50_WORK"
              }
            ]);
            break;
    

      case "CURATION_BUDGET_50_WORK":
        response = Response.genQuickReply(i18n.__("curation.fine"), [
          {
            title: i18n.__("menu.help"),
            payload: "CARE_HELP"
          }
        ]);
        break;

      // case "CARE_CDC":
      //   response = Response.genQuickReply(i18n.__("care.check"), [
      //     {
      //       title: i18n.__("menu.help"),
      //       payload: "CARE_HELP"
      //     }
      //   ]);
      // break;

      case "CURATION_BUDGET_20_PARTY":
        response = Response.genQuickReply(i18n.__("care.check"), [
          {
            title: "Check Symptoms",
            payload: "CURATION_BUDGET_20_WORK"
          },
          {
            title: "Contact CDC",
            payload: "CARE_HELP"
          }
        ]);
      break;

      case "CURATION_BUDGET_20_DINNER":
      case "CURATION_BUDGET_30_DINNER":
      case "CURATION_BUDGET_50_DINNER":
      
      case "CURATION_BUDGET_30_PARTY":
      case "CURATION_BUDGET_50_PARTY":
        response = this.genCurationResponse(payload);
        break;

      case "CURATION_OTHER_STYLE":
        // Build the recommendation logic here
        outfit = `${this.user.gender}-${this.randomOutfit()}`;

        response = Response.genGenericTemplate(
          `${config.appUrl}/styles/${outfit}.jpg`,
          i18n.__("curation.title"),
          i18n.__("curation.subtitle"),
          [
            Response.genWebUrlButton(
              i18n.__("curation.shop"),
              `${config.shopUrl}/products/${outfit}`
            ),
            Response.genPostbackButton(
              i18n.__("curation.show"),
              "CURATION_OTHER_STYLE"
            )
          ]
        );
        break;
    }

    return response;
  }

  genCurationResponse(payload) {
    let occasion = payload.split("_")[3].toLowerCase();
    let budget = payload.split("_")[2].toLowerCase();
    let outfit = `${this.user.gender}-${occasion}`;

    let buttons = [
      Response.genWebUrlButton(
        i18n.__("curation.shop"),
        `${config.shopUrl}/products/${outfit}`
      ),
      Response.genPostbackButton(
        i18n.__("curation.show"),
        "CURATION_OTHER_STYLE"
      )
    ];

    if (budget === "50") {
      buttons.push(
        Response.genPostbackButton(i18n.__("curation.sales"), "CARE_CDC")
      );
    }

    let response = Response.genGenericTemplate(
      `${config.appUrl}/styles/${outfit}.jpg`,
      i18n.__("curation.title"),
      i18n.__("curation.subtitle"),
      buttons
    );

    return response;
  }

  randomOutfit() {
    let occasion = ["work", "party", "dinner"];
    let randomIndex = Math.floor(Math.random() * occasion.length);

    return occasion[randomIndex];
  }
};
