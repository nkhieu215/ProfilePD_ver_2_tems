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

describe('ThietBi e2e test', () => {
  const thietBiPageUrl = '/thiet-bi';
  const thietBiPageUrlPattern = new RegExp('/thiet-bi(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const thietBiSample = {};

  let thietBi: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/thiet-bis+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/thiet-bis').as('postEntityRequest');
    cy.intercept('DELETE', '/api/thiet-bis/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (thietBi) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/thiet-bis/${thietBi.id}`,
      }).then(() => {
        thietBi = undefined;
      });
    }
  });

  it('ThietBis menu should load ThietBis page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('thiet-bi');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ThietBi').should('exist');
    cy.url().should('match', thietBiPageUrlPattern);
  });

  describe('ThietBi page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(thietBiPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ThietBi page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/thiet-bi/new$'));
        cy.getEntityCreateUpdateHeading('ThietBi');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thietBiPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/thiet-bis',
          body: thietBiSample,
        }).then(({ body }) => {
          thietBi = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/thiet-bis+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/thiet-bis?page=0&size=20>; rel="last",<http://localhost/api/thiet-bis?page=0&size=20>; rel="first"',
              },
              body: [thietBi],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(thietBiPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ThietBi page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('thietBi');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thietBiPageUrlPattern);
      });

      it('edit button click should load edit ThietBi page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ThietBi');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thietBiPageUrlPattern);
      });

      it('last delete button click should delete instance of ThietBi', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('thietBi').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thietBiPageUrlPattern);

        thietBi = undefined;
      });
    });
  });

  describe('new ThietBi page', () => {
    beforeEach(() => {
      cy.visit(`${thietBiPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ThietBi');
    });

    it('should create an instance of ThietBi', () => {
      cy.get(`[data-cy="maThietBi"]`).type('Avon').should('have.value', 'Avon');

      cy.get(`[data-cy="loaiThietBi"]`).type('Analyst').should('have.value', 'Analyst');

      cy.get(`[data-cy="dayChuyen"]`).type('engineer Cambridgeshire Automotive').should('have.value', 'engineer Cambridgeshire Automotive');

      cy.get(`[data-cy="ngayTao"]`).type('2023-10-16T04:08').should('have.value', '2023-10-16T04:08');

      cy.get(`[data-cy="timeUpdate"]`).type('2023-10-16T10:14').should('have.value', '2023-10-16T10:14');

      cy.get(`[data-cy="updateBy"]`).type('overriding Cheese cross-platform').should('have.value', 'overriding Cheese cross-platform');

      cy.get(`[data-cy="trangThai"]`).type('Alaska architect CSS').should('have.value', 'Alaska architect CSS');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        thietBi = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', thietBiPageUrlPattern);
    });
  });
});
