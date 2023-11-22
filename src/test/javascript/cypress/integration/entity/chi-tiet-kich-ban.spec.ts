import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ChiTietKichBan e2e test', () => {
  const chiTietKichBanPageUrl = '/chi-tiet-kich-ban';
  const chiTietKichBanPageUrlPattern = new RegExp('/chi-tiet-kich-ban(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const chiTietKichBanSample = {};

  let chiTietKichBan: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/chi-tiet-kich-bans+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/chi-tiet-kich-bans').as('postEntityRequest');
    cy.intercept('DELETE', '/api/chi-tiet-kich-bans/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (chiTietKichBan) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/chi-tiet-kich-bans/${chiTietKichBan.id}`,
      }).then(() => {
        chiTietKichBan = undefined;
      });
    }
  });

  it('ChiTietKichBans menu should load ChiTietKichBans page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('chi-tiet-kich-ban');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ChiTietKichBan').should('exist');
    cy.url().should('match', chiTietKichBanPageUrlPattern);
  });

  describe('ChiTietKichBan page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(chiTietKichBanPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ChiTietKichBan page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/chi-tiet-kich-ban/new$'));
        cy.getEntityCreateUpdateHeading('ChiTietKichBan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietKichBanPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/chi-tiet-kich-bans',
          body: chiTietKichBanSample,
        }).then(({ body }) => {
          chiTietKichBan = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/chi-tiet-kich-bans+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/chi-tiet-kich-bans?page=0&size=20>; rel="last",<http://localhost/api/chi-tiet-kich-bans?page=0&size=20>; rel="first"',
              },
              body: [chiTietKichBan],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(chiTietKichBanPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ChiTietKichBan page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('chiTietKichBan');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietKichBanPageUrlPattern);
      });

      it('edit button click should load edit ChiTietKichBan page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ChiTietKichBan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietKichBanPageUrlPattern);
      });

      it('last delete button click should delete instance of ChiTietKichBan', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('chiTietKichBan').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietKichBanPageUrlPattern);

        chiTietKichBan = undefined;
      });
    });
  });

  describe('new ChiTietKichBan page', () => {
    beforeEach(() => {
      cy.visit(`${chiTietKichBanPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ChiTietKichBan');
    });

    it('should create an instance of ChiTietKichBan', () => {
      cy.get(`[data-cy="maKichBan"]`).type('green').should('have.value', 'green');

      cy.get(`[data-cy="hangMkb"]`).type('44701').should('have.value', '44701');

      cy.get(`[data-cy="thongSo"]`).type('Licensed SMTP Human').should('have.value', 'Licensed SMTP Human');

      cy.get(`[data-cy="minValue"]`).type('29324').should('have.value', '29324');

      cy.get(`[data-cy="maxValue"]`).type('93339').should('have.value', '93339');

      cy.get(`[data-cy="trungbinh"]`).type('93434').should('have.value', '93434');

      cy.get(`[data-cy="donVi"]`).type('Designer compressing').should('have.value', 'Designer compressing');

      cy.get(`[data-cy="phanLoai"]`).type('rich').should('have.value', 'rich');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        chiTietKichBan = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', chiTietKichBanPageUrlPattern);
    });
  });
});
