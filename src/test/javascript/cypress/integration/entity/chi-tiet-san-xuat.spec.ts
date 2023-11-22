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

describe('ChiTietSanXuat e2e test', () => {
  const chiTietSanXuatPageUrl = '/chi-tiet-san-xuat';
  const chiTietSanXuatPageUrlPattern = new RegExp('/chi-tiet-san-xuat(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const chiTietSanXuatSample = {};

  let chiTietSanXuat: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/chi-tiet-san-xuats+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/chi-tiet-san-xuats').as('postEntityRequest');
    cy.intercept('DELETE', '/api/chi-tiet-san-xuats/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (chiTietSanXuat) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/chi-tiet-san-xuats/${chiTietSanXuat.id}`,
      }).then(() => {
        chiTietSanXuat = undefined;
      });
    }
  });

  it('ChiTietSanXuats menu should load ChiTietSanXuats page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('chi-tiet-san-xuat');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ChiTietSanXuat').should('exist');
    cy.url().should('match', chiTietSanXuatPageUrlPattern);
  });

  describe('ChiTietSanXuat page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(chiTietSanXuatPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ChiTietSanXuat page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/chi-tiet-san-xuat/new$'));
        cy.getEntityCreateUpdateHeading('ChiTietSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietSanXuatPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/chi-tiet-san-xuats',
          body: chiTietSanXuatSample,
        }).then(({ body }) => {
          chiTietSanXuat = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/chi-tiet-san-xuats+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/chi-tiet-san-xuats?page=0&size=20>; rel="last",<http://localhost/api/chi-tiet-san-xuats?page=0&size=20>; rel="first"',
              },
              body: [chiTietSanXuat],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(chiTietSanXuatPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ChiTietSanXuat page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('chiTietSanXuat');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietSanXuatPageUrlPattern);
      });

      it('edit button click should load edit ChiTietSanXuat page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ChiTietSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietSanXuatPageUrlPattern);
      });

      it('last delete button click should delete instance of ChiTietSanXuat', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('chiTietSanXuat').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietSanXuatPageUrlPattern);

        chiTietSanXuat = undefined;
      });
    });
  });

  describe('new ChiTietSanXuat page', () => {
    beforeEach(() => {
      cy.visit(`${chiTietSanXuatPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ChiTietSanXuat');
    });

    it('should create an instance of ChiTietSanXuat', () => {
      cy.get(`[data-cy="maKichBan"]`).type('Indian Facilitator').should('have.value', 'Indian Facilitator');

      cy.get(`[data-cy="hangSxhn"]`).type('25651').should('have.value', '25651');

      cy.get(`[data-cy="thongSo"]`).type('Beauty Dollar Group').should('have.value', 'Beauty Dollar Group');

      cy.get(`[data-cy="minValue"]`).type('1111').should('have.value', '1111');

      cy.get(`[data-cy="maxValue"]`).type('78435').should('have.value', '78435');

      cy.get(`[data-cy="trungbinh"]`).type('3676').should('have.value', '3676');

      cy.get(`[data-cy="donVi"]`).type('Concrete Beauty').should('have.value', 'Concrete Beauty');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        chiTietSanXuat = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', chiTietSanXuatPageUrlPattern);
    });
  });
});
