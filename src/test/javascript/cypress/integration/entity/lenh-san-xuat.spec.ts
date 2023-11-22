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

describe('LenhSanXuat e2e test', () => {
  const lenhSanXuatPageUrl = '/lenh-san-xuat';
  const lenhSanXuatPageUrlPattern = new RegExp('/lenh-san-xuat(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const lenhSanXuatSample = { maLenhSanXuat: 99632 };

  let lenhSanXuat: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/lenh-san-xuats+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/lenh-san-xuats').as('postEntityRequest');
    cy.intercept('DELETE', '/api/lenh-san-xuats/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (lenhSanXuat) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/lenh-san-xuats/${lenhSanXuat.id}`,
      }).then(() => {
        lenhSanXuat = undefined;
      });
    }
  });

  it('LenhSanXuats menu should load LenhSanXuats page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('lenh-san-xuat');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LenhSanXuat').should('exist');
    cy.url().should('match', lenhSanXuatPageUrlPattern);
  });

  describe('LenhSanXuat page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(lenhSanXuatPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LenhSanXuat page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/lenh-san-xuat/new$'));
        cy.getEntityCreateUpdateHeading('LenhSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lenhSanXuatPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/lenh-san-xuats',
          body: lenhSanXuatSample,
        }).then(({ body }) => {
          lenhSanXuat = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/lenh-san-xuats+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/lenh-san-xuats?page=0&size=20>; rel="last",<http://localhost/api/lenh-san-xuats?page=0&size=20>; rel="first"',
              },
              body: [lenhSanXuat],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(lenhSanXuatPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LenhSanXuat page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('lenhSanXuat');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lenhSanXuatPageUrlPattern);
      });

      it('edit button click should load edit LenhSanXuat page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LenhSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lenhSanXuatPageUrlPattern);
      });

      it('last delete button click should delete instance of LenhSanXuat', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('lenhSanXuat').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', lenhSanXuatPageUrlPattern);

        lenhSanXuat = undefined;
      });
    });
  });

  describe('new LenhSanXuat page', () => {
    beforeEach(() => {
      cy.visit(`${lenhSanXuatPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LenhSanXuat');
    });

    it('should create an instance of LenhSanXuat', () => {
      cy.get(`[data-cy="maLenhSanXuat"]`).type('70064').should('have.value', '70064');

      cy.get(`[data-cy="sapCode"]`).type('SCSI Burg redundant').should('have.value', 'SCSI Burg redundant');

      cy.get(`[data-cy="sapName"]`).type('Soft Borders').should('have.value', 'Soft Borders');

      cy.get(`[data-cy="workOrderCode"]`).type('salmon').should('have.value', 'salmon');

      cy.get(`[data-cy="version"]`).type('convergence Developer').should('have.value', 'convergence Developer');

      cy.get(`[data-cy="storageCode"]`).type('Botswana').should('have.value', 'Botswana');

      cy.get(`[data-cy="totalQuantity"]`).type('open-source').should('have.value', 'open-source');

      cy.get(`[data-cy="createBy"]`).type('synthesize').should('have.value', 'synthesize');

      cy.get(`[data-cy="entryTime"]`).type('bypass Granite USB').should('have.value', 'bypass Granite USB');

      cy.get(`[data-cy="trangThai"]`).type('Burg firewall').should('have.value', 'Burg firewall');

      cy.get(`[data-cy="comment"]`).type('Rubber').should('have.value', 'Rubber');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        lenhSanXuat = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', lenhSanXuatPageUrlPattern);
    });
  });
});
