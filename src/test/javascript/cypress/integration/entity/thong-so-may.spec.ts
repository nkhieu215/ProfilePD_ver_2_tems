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

describe('ThongSoMay e2e test', () => {
  const thongSoMayPageUrl = '/thong-so-may';
  const thongSoMayPageUrlPattern = new RegExp('/thong-so-may(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const thongSoMaySample = {};

  let thongSoMay: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/thong-so-mays+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/thong-so-mays').as('postEntityRequest');
    cy.intercept('DELETE', '/api/thong-so-mays/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (thongSoMay) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/thong-so-mays/${thongSoMay.id}`,
      }).then(() => {
        thongSoMay = undefined;
      });
    }
  });

  it('ThongSoMays menu should load ThongSoMays page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('thong-so-may');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ThongSoMay').should('exist');
    cy.url().should('match', thongSoMayPageUrlPattern);
  });

  describe('ThongSoMay page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(thongSoMayPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ThongSoMay page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/thong-so-may/new$'));
        cy.getEntityCreateUpdateHeading('ThongSoMay');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thongSoMayPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/thong-so-mays',
          body: thongSoMaySample,
        }).then(({ body }) => {
          thongSoMay = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/thong-so-mays+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/thong-so-mays?page=0&size=20>; rel="last",<http://localhost/api/thong-so-mays?page=0&size=20>; rel="first"',
              },
              body: [thongSoMay],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(thongSoMayPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ThongSoMay page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('thongSoMay');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thongSoMayPageUrlPattern);
      });

      it('edit button click should load edit ThongSoMay page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ThongSoMay');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thongSoMayPageUrlPattern);
      });

      it('last delete button click should delete instance of ThongSoMay', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('thongSoMay').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', thongSoMayPageUrlPattern);

        thongSoMay = undefined;
      });
    });
  });

  describe('new ThongSoMay page', () => {
    beforeEach(() => {
      cy.visit(`${thongSoMayPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ThongSoMay');
    });

    it('should create an instance of ThongSoMay', () => {
      cy.get(`[data-cy="maThietBi"]`).type('Rica').should('have.value', 'Rica');

      cy.get(`[data-cy="loaiThietBi"]`).type('Forward Sleek programming').should('have.value', 'Forward Sleek programming');

      cy.get(`[data-cy="hangTms"]`).type('55113').should('have.value', '55113');

      cy.get(`[data-cy="thongSo"]`).type('Soft responsive').should('have.value', 'Soft responsive');

      cy.get(`[data-cy="moTa"]`).type('Jamaican').should('have.value', 'Jamaican');

      cy.get(`[data-cy="trangThai"]`).type('Cotton').should('have.value', 'Cotton');

      cy.get(`[data-cy="phanLoai"]`).type('black productize Automotive').should('have.value', 'black productize Automotive');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        thongSoMay = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', thongSoMayPageUrlPattern);
    });
  });
});
