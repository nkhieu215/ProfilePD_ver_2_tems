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

describe('KichBan e2e test', () => {
  const kichBanPageUrl = '/kich-ban';
  const kichBanPageUrlPattern = new RegExp('/kich-ban(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kichBanSample = {};

  let kichBan: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kich-bans+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kich-bans').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kich-bans/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kichBan) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kich-bans/${kichBan.id}`,
      }).then(() => {
        kichBan = undefined;
      });
    }
  });

  it('KichBans menu should load KichBans page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kich-ban');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KichBan').should('exist');
    cy.url().should('match', kichBanPageUrlPattern);
  });

  describe('KichBan page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kichBanPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KichBan page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kich-ban/new$'));
        cy.getEntityCreateUpdateHeading('KichBan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', kichBanPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kich-bans',
          body: kichBanSample,
        }).then(({ body }) => {
          kichBan = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kich-bans+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/kich-bans?page=0&size=20>; rel="last",<http://localhost/api/kich-bans?page=0&size=20>; rel="first"',
              },
              body: [kichBan],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kichBanPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KichBan page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kichBan');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', kichBanPageUrlPattern);
      });

      it('edit button click should load edit KichBan page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KichBan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', kichBanPageUrlPattern);
      });

      it('last delete button click should delete instance of KichBan', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('kichBan').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', kichBanPageUrlPattern);

        kichBan = undefined;
      });
    });
  });

  describe('new KichBan page', () => {
    beforeEach(() => {
      cy.visit(`${kichBanPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KichBan');
    });

    it('should create an instance of KichBan', () => {
      cy.get(`[data-cy="maKichBan"]`).type('Multi-tiered Direct').should('have.value', 'Multi-tiered Direct');

      cy.get(`[data-cy="maThietBi"]`).type('Gloves Kyrgyz').should('have.value', 'Gloves Kyrgyz');

      cy.get(`[data-cy="loaiThietBi"]`).type('white Configuration').should('have.value', 'white Configuration');

      cy.get(`[data-cy="dayChuyen"]`).type('niches compressing Eritrea').should('have.value', 'niches compressing Eritrea');

      cy.get(`[data-cy="maSanPham"]`).type('harness').should('have.value', 'harness');

      cy.get(`[data-cy="versionSanPham"]`).type('alarm Ergonomic face').should('have.value', 'alarm Ergonomic face');

      cy.get(`[data-cy="ngayTao"]`).type('2023-10-16T18:38').should('have.value', '2023-10-16T18:38');

      cy.get(`[data-cy="timeUpdate"]`).type('2023-10-16T10:12').should('have.value', '2023-10-16T10:12');

      cy.get(`[data-cy="updateBy"]`).type('Shoes override').should('have.value', 'Shoes override');

      cy.get(`[data-cy="trangThai"]`).type('Car').should('have.value', 'Car');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        kichBan = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', kichBanPageUrlPattern);
    });
  });
});
