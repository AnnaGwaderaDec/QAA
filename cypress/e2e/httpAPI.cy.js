chai.use(require("chai-uuid"));

//////// #1
describe("httpbin tests get image", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/image/png",
    failOnStatusCode: false,
  };

  it("response code should be 200", () => {
    cy.request(request).then((response) => {
      cy.log(response);
      assert.equal(200, response.status);
      cy.log(response.duration);
      assert.isTrue(response.duration <= 10000);
      assert.equal("8090", response.headers["content-length"]);
    });
  });
});

//////// #2
describe("httpbin tests headers", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/headers",
    headers: {
      "Custom-Header": "CypressTest",
    },
  };

  it("test that header set correctly", () => {
    cy.request(request).then((response) => {
      assert.equal(200, response.status);
      assert.equal("CypressTest", response.requestHeaders["Custom-Header"]);
    });
  });
});

//////// #3
describe("httpbin tests POST", () => {
  it("test random ids", () => {
    for (let i = 0; i < 5; i++) {
      const randomId = getRandomInt(100000);

      const request = {
        method: "POST",
        url: "https://httpbin.org/post",
        body: {
          args: {
            sky: "blue",
            dog: "black",
          },
          id: randomId,
          data: "today",
        },
      };

      cy.request(request).then((response) => {
        assert.isTrue(response.status == 200);
        assert.isTrue(response.body.json.args.sky == "blue");
        expect(response.body).to.have.property("data");
        assert.equal(randomId, response.body.json.id);
      });
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//////// #4
describe("httpbin tests wrong method", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/delete",
    headers: {
      "User-Agent": "Cypress",
    },
    failOnStatusCode: false,
  };

  it("test that serwer answer corectly", () => {
    cy.request(request).then((response) => {
      assert.equal(405, response.status);
    });
  });
});

//////// #5
describe("httpbin tests gest user agent", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/user-agent",
  };

  it("print and check the contents", () => {
    cy.request(request).then((response) => {
      cy.log(response.body["user-agent"]);
      expect(response.body["user-agent"]).contains("Win64");
    });
  });
});

//////// #6
describe("httpbin tests check response format", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/gzip",
  };

  it("check response format", () => {
    cy.request(request).then((response) => {
      expect(response.headers["content-encoding"]).to.eq("gzip");
      expect(response.body.gzipped).to.eq(true);
    });
  });
});

//////// #7
describe("httpbin tests correct login details", () => {
  const request1 = {
    method: "GET",
    url: "https://httpbin.org/basic-auth/pies/duzoko%24ci",
    headers: {
      Authorization: "Basic " + btoa("pies:duzoko$ci"),
    },
  };

  const request2 = {
    method: "GET",
    url: "https://httpbin.org/basic-auth/pies/duzoko%24ci",
    headers: {
      Authorization: "Basic " + btoa("pies:maloko$ci"),
    },
    failOnStatusCode: false,
  };

  it("valid data", () => {
    cy.request(request1).then((response) => {
      assert.equal(200, response.status);
    });
  });

  it("invalid data", () => {
    cy.request(request2).then((response) => {
      assert.equal(401, response.status);
    });
  });
});

//////// #8
describe("httpbin tests check is response is valid uuid v4", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/uuid",
  };

  it("check response data format", () => {
    cy.request(request).then((response) => {
      expect(response.body.uuid).to.be.a.uuid("v4");
    });
  });
});

//////// #9
describe("delay", () => {
  const request = {
    method: "POST",
    url: "https://httpbin.org/delay/8",
  };

  it("check delay", () => {
    cy.request(request).then((response) => {
      cy.log(response.duration);
      assert.isTrue(response.duration >= 8000);
    });
  });
});

//////// #10
describe("random response code, one of range <200,204>", () => {
  const request = {
    method: "PATCH",
    url: "https://httpbin.org/status/200%2C201%2C202%2C203%2C204",
  };

  it("check response code", () => {
    cy.request(request).then((response) => {
      expect(response.status).to.be.oneOf([200, 201, 202, 203, 204]);
    });
  });
});
