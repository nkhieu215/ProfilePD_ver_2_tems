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

describe('ChiTietLichSuUpdate e2e test', () => {
  const chiTietLichSuUpdatePageUrl = '/chi-tiet-lich-su-update';
  const chiTietLichSuUpdatePageUrlPattern = new RegExp('/chi-tiet-lich-su-update(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const chiTietLichSuUpdateSample = {};

  let chiTietLichSuUpdate: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/chi-tiet-lich-su-updates+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/chi-tiet-lich-su-updates').as('postEntityRequest');
    cy.intercept('DELETE', '/api/chi-tiet-lich-su-updates/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (chiTietLichSuUpdate) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/chi-tiet-lich-su-updates/${chiTietLichSuUpdate.id}`,
      }).then(() => {
        chiTietLichSuUpdate = undefined;
      });
    }
  });

  it('ChiTietLichSuUpdates menu should load ChiTietLichSuUpdates page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('chi-tiet-lich-su-update');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ChiTietLichSuUpdate').should('exist');
    cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);
  });

  describe('ChiTietLichSuUpdate page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(chiTietLichSuUpdatePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ChiTietLichSuUpdate page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/chi-tiet-lich-su-update/new$'));
        cy.getEntityCreateUpdateHeading('ChiTietLichSuUpdate');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/chi-tiet-lich-su-updates',
          body: chiTietLichSuUpdateSample,
        }).then(({ body }) => {
          chiTietLichSuUpdate = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/chi-tiet-lich-su-updates+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/chi-tiet-lich-su-updates?page=0&size=20>; rel="last",<http://localhost/api/chi-tiet-lich-su-updates?page=0&size=20>; rel="first"',
              },
              body: [chiTietLichSuUpdate],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(chiTietLichSuUpdatePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ChiTietLichSuUpdate page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('chiTietLichSuUpdate');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);
      });

      it('edit button click should load edit ChiTietLichSuUpdate page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ChiTietLichSuUpdate');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);
      });

      it('last delete button click should delete instance of ChiTietLichSuUpdate', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('chiTietLichSuUpdate').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);

        chiTietLichSuUpdate = undefined;
      });
    });
  });

  describe('new ChiTietLichSuUpdate page', () => {
    beforeEach(() => {
      cy.visit(`${chiTietLichSuUpdatePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ChiTietLichSuUpdate');
    });

    it('should create an instance of ChiTietLichSuUpdate', () => {
      cy.get(`[data-cy="maKichBan"]`).type('driver').should('have.value', 'driver');

      cy.get(`[data-cy="hangLssx"]`).type('47373').should('have.value', '47373');

      cy.get(`[data-cy="thongSo"]`).type('Licensed').should('have.value', 'Licensed');

      cy.get(`[data-cy="minValue"]`).type('98285').should('have.value', '98285');

      cy.get(`[data-cy="maxValue"]`).type('93130').should('have.value', '93130');

      cy.get(`[data-cy="trungbinh"]`).type('94956').should('have.value', '94956');

      cy.get(`[data-cy="donVi"]`).type('Credit Baby Practical').should('have.value', 'Credit Baby Practical');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        chiTietLichSuUpdate = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', chiTietLichSuUpdatePageUrlPattern);
    });
  });
});
