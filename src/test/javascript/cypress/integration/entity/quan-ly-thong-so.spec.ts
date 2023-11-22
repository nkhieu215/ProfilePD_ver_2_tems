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

describe('QuanLyThongSo e2e test', () => {
  const quanLyThongSoPageUrl = '/quan-ly-thong-so';
  const quanLyThongSoPageUrlPattern = new RegExp('/quan-ly-thong-so(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const quanLyThongSoSample = {};

  let quanLyThongSo: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/quan-ly-thong-sos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/quan-ly-thong-sos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/quan-ly-thong-sos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (quanLyThongSo) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/quan-ly-thong-sos/${quanLyThongSo.id}`,
      }).then(() => {
        quanLyThongSo = undefined;
      });
    }
  });

  it('QuanLyThongSos menu should load QuanLyThongSos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('quan-ly-thong-so');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('QuanLyThongSo').should('exist');
    cy.url().should('match', quanLyThongSoPageUrlPattern);
  });

  describe('QuanLyThongSo page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(quanLyThongSoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create QuanLyThongSo page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/quan-ly-thong-so/new$'));
        cy.getEntityCreateUpdateHeading('QuanLyThongSo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', quanLyThongSoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/quan-ly-thong-sos',
          body: quanLyThongSoSample,
        }).then(({ body }) => {
          quanLyThongSo = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/quan-ly-thong-sos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/quan-ly-thong-sos?page=0&size=20>; rel="last",<http://localhost/api/quan-ly-thong-sos?page=0&size=20>; rel="first"',
              },
              body: [quanLyThongSo],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(quanLyThongSoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details QuanLyThongSo page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('quanLyThongSo');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', quanLyThongSoPageUrlPattern);
      });

      it('edit button click should load edit QuanLyThongSo page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('QuanLyThongSo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', quanLyThongSoPageUrlPattern);
      });

      it('last delete button click should delete instance of QuanLyThongSo', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('quanLyThongSo').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', quanLyThongSoPageUrlPattern);

        quanLyThongSo = undefined;
      });
    });
  });

  describe('new QuanLyThongSo page', () => {
    beforeEach(() => {
      cy.visit(`${quanLyThongSoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('QuanLyThongSo');
    });

    it('should create an instance of QuanLyThongSo', () => {
      cy.get(`[data-cy="maThongSo"]`).type('invoice Cheese program').should('have.value', 'invoice Cheese program');

      cy.get(`[data-cy="tenThongSo"]`).type('USB Market').should('have.value', 'USB Market');

      cy.get(`[data-cy="moTa"]`).type('up scale cyan').should('have.value', 'up scale cyan');

      cy.get(`[data-cy="ngayTao"]`).type('2023-10-16T18:02').should('have.value', '2023-10-16T18:02');

      cy.get(`[data-cy="ngayUpdate"]`).type('2023-10-16T05:55').should('have.value', '2023-10-16T05:55');

      cy.get(`[data-cy="updateBy"]`).type('synthesizing visualize Jewelery').should('have.value', 'synthesizing visualize Jewelery');

      cy.get(`[data-cy="status"]`).type('Bedfordshire invoice').should('have.value', 'Bedfordshire invoice');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        quanLyThongSo = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', quanLyThongSoPageUrlPattern);
    });
  });
});
