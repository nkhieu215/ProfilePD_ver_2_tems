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

describe('LichSuUpdate e2e test', () => {
  const lichSuUpdatePageUrl = '/lich-su-update';
  const lichSuUpdatePageUrlPattern = new RegExp('/lich-su-update(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const lichSuUpdateSample = {};

  let lichSuUpdate: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lich-su-updates+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lich-su-updates').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lich-su-updates/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (lichSuUpdate) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lich-su-updates/${lichSuUpdate.id}`,
      }).then(() => {
        lichSuUpdate = undefined;
      });
    }
  });

  it('LichSuUpdates menu should load LichSuUpdates page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lich-su-update');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LichSuUpdate').should('exist');
    cy.url().should('match', lichSuUpdatePageUrlPattern);
  });

  describe('LichSuUpdate page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(lichSuUpdatePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LichSuUpdate page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lich-su-update/new$'));
        cy.getEntityCreateUpdateHeading('LichSuUpdate');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lichSuUpdatePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lich-su-updates',
          body: lichSuUpdateSample,
        }).then(({ body }) => {
          lichSuUpdate = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lich-su-updates+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/lich-su-updates?page=0&size=20>; rel="last",<http://localhost/api/lich-su-updates?page=0&size=20>; rel="first"',
              },
              body: [lichSuUpdate],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(lichSuUpdatePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LichSuUpdate page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('lichSuUpdate');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lichSuUpdatePageUrlPattern);
      });

      it('edit button click should load edit LichSuUpdate page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LichSuUpdate');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lichSuUpdatePageUrlPattern);
      });

      it('last delete button click should delete instance of LichSuUpdate', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('lichSuUpdate').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lichSuUpdatePageUrlPattern);

        lichSuUpdate = undefined;
      });
    });
  });

  describe('new LichSuUpdate page', () => {
    beforeEach(() => {
      cy.visit(`${lichSuUpdatePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LichSuUpdate');
    });

    it('should create an instance of LichSuUpdate', () => {
      cy.get(`[data-cy="maKichBan"]`).type('yellow').should('have.value', 'yellow');

      cy.get(`[data-cy="maThietBi"]`).type('Bedfordshire Berkshire').should('have.value', 'Bedfordshire Berkshire');

      cy.get(`[data-cy="loaiThietBi"]`).type('radical').should('have.value', 'radical');

      cy.get(`[data-cy="dayChuyen"]`).type('Bangladesh').should('have.value', 'Bangladesh');

      cy.get(`[data-cy="maSanPham"]`).type('Jordan multi-byte').should('have.value', 'Jordan multi-byte');

      cy.get(`[data-cy="versionSanPham"]`).type('sexy').should('have.value', 'sexy');

      cy.get(`[data-cy="timeUpdate"]`).type('2023-10-17T02:06').should('have.value', '2023-10-17T02:06');

      cy.get(`[data-cy="status"]`).type('blockchains').should('have.value', 'blockchains');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        lichSuUpdate = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', lichSuUpdatePageUrlPattern);
    });
  });
});
