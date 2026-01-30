import { describe, expect, it } from "bun:test"
import * as pactum from "pactum"
import { updateUserRole } from "../../src/db/index.js"
import { CreateUserAndVerify, organizationPayload, userAuthPayload } from "../helpers/payload.js"

describe("Admin Operations", () => {
  let admin
  it("Create an Admin user", async () => {
    admin = await CreateUserAndVerify({ ...userAuthPayload, email: "admin2@test.com" })
    const updatedUser = await updateUserRole(admin!.user.id, "admin")
    console.log({ admin, updatedUser })
    expect(admin!.user.email).toBe("admin2@test.com")
  })

  // Organization tests here
  // Organization -> Teams -> Members
  const orgPayload = organizationPayload
  it("Prevent User from Creating Organization", async () => {
    await pactum
      .spec()
      .post("/auth/organization/create")
      .withJson({ ...orgPayload, userId: admin!.user.id, name: "Test Org" })
      .expectStatus(401)
  })
  it("Allow admin to  Create Organization", async () => {
    await pactum
      .spec()
      .post("/auth/organization/create")
      .withBearerToken(admin!.token)
      .withJson({ ...orgPayload, userId: admin!.user.id, slug: "test-org" })
      .expectStatus(200)
      .stores("orgId", "id")
      .inspect()
  })
  // describe("Organization Role", () => {
  //   it("Allow admin to  Create Organization Role", async () => {
  //     await pactum
  //       .spec()
  //       .post("/auth/organization/create-role")
  //       .withBearerToken("$S{authToken}")
  //       .withJson({
  //         role: "community_head", // required
  //         permission: permission_statement,
  //         organizationId: "$S{orgId}",
  //       })
  //       .expectStatus(200)
  //       .stores("orgId", "id")
  //       .inspect()
  //   })
  // })

  it("Create Team/Sub organization", async () => {
    await pactum
      .spec()
      .post("/auth/organization/create-team")
      .withBearerToken(admin!.token)
      .withJson({
        name: "Surulere Test Team",
        organizationId: "$S{orgId}",
      })
      .expectStatus(200)
      .stores("teamId", "id")
      .inspect()
  })

  it("Get All Team/Sub organization", async () => {
    await pactum
      .spec()
      .get("/auth/organization/list-teams")
      .withBearerToken(admin!.token)
      .withQueryParams({
        organizationId: "$S{orgId}",
      })
      .expectStatus(200)
      .inspect()
  })

  it("Get One Team/Sub organization", async () => {
    await pactum
      .spec()
      .get("/auth/organization/list-teams")
      .withBearerToken(admin!.token)
      .withQueryParams({
        organizationId: "$S{orgId}",
      })
      .expectStatus(200)
      .inspect()
  })
  it("Update One Team/Sub organization", async () => {
    await pactum
      .spec()
      .post("/auth/organization/update-team")
      .withBearerToken(admin!.token)
      .withJson({
        teamId: "$S{teamId}",
        data: {
          name: "Surulere Test Team Updated",
          organizationId: "$S{orgId}",
        },
      })
      .expectStatus(200)
      .inspect()
  })
  it("Delete One Team/Sub organization", async () => {
    await pactum
      .spec()
      .post("/auth/organization/remove-team")
      .withBearerToken(admin!.token)
      .withJson({
        teamId: "$S{teamId}",
        organizationId: "$S{orgId}",
      })
      .expectStatus(200)
      .inspect()
  })
})
