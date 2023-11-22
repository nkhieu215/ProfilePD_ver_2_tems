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

describe('ChiTietLenhSanXuat e2e test', () => {
  const chiTietLenhSanXuatPageUrl = '/chi-tiet-lenh-san-xuat';
  const chiTietLenhSanXuatPageUrlPattern = new RegExp('/chi-tiet-lenh-san-xuat(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const chiTietLenhSanXuatSample = {
    reelID: 95378,
    partNumber: 'District',
    vendor: 'Yen incentivize system',
    lot: 'Missouri lavender Jamaica',
    userData1: 'Cotton Regional Borders',
    userData2: 'content Data sensor',
    userData3: 'Pike multi-byte connect',
    userData4: 28017,
    userData5: 6335,
    initialQuantity: 86151,
    quantityOverride: 67039,
    storageUnit: 'Industrial',
    expirationDate: 'ADP Sports Exclusive',
    manufacturingDate: 'Communications',
  };

  let chiTietLenhSanXuat: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/chi-tiet-lenh-san-xuats+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/chi-tiet-lenh-san-xuats').as('postEntityRequest');
    cy.intercept('DELETE', '/api/chi-tiet-lenh-san-xuats/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (chiTietLenhSanXuat) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/chi-tiet-lenh-san-xuats/${chiTietLenhSanXuat.id}`,
      }).then(() => {
        chiTietLenhSanXuat = undefined;
      });
    }
  });

  it('ChiTietLenhSanXuats menu should load ChiTietLenhSanXuats page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('chi-tiet-lenh-san-xuat');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ChiTietLenhSanXuat').should('exist');
    cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);
  });

  describe('ChiTietLenhSanXuat page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(chiTietLenhSanXuatPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ChiTietLenhSanXuat page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/chi-tiet-lenh-san-xuat/new$'));
        cy.getEntityCreateUpdateHeading('ChiTietLenhSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/chi-tiet-lenh-san-xuats',
          body: chiTietLenhSanXuatSample,
        }).then(({ body }) => {
          chiTietLenhSanXuat = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/chi-tiet-lenh-san-xuats+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/chi-tiet-lenh-san-xuats?page=0&size=20>; rel="last",<http://localhost/api/chi-tiet-lenh-san-xuats?page=0&size=20>; rel="first"',
              },
              body: [chiTietLenhSanXuat],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(chiTietLenhSanXuatPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ChiTietLenhSanXuat page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('chiTietLenhSanXuat');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);
      });

      it('edit button click should load edit ChiTietLenhSanXuat page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ChiTietLenhSanXuat');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);
      });

      it('last delete button click should delete instance of ChiTietLenhSanXuat', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('chiTietLenhSanXuat').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);

        chiTietLenhSanXuat = undefined;
      });
    });
  });

  describe('new ChiTietLenhSanXuat page', () => {
    beforeEach(() => {
      cy.visit(`${chiTietLenhSanXuatPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ChiTietLenhSanXuat');
    });

    it('should create an instance of ChiTietLenhSanXuat', () => {
      cy.get(`[data-cy="reelID"]`).type('17594').should('have.value', '17594');

      cy.get(`[data-cy="partNumber"]`).type('Re-engineered holistic').should('have.value', 'Re-engineered holistic');

      cy.get(`[data-cy="vendor"]`).type('secondary').should('have.value', 'secondary');

      cy.get(`[data-cy="lot"]`).type('olive Cotton calculate').should('have.value', 'olive Cotton calculate');

      cy.get(`[data-cy="userData1"]`).type('functionalities Intelligent').should('have.value', 'functionalities Intelligent');

      cy.get(`[data-cy="userData2"]`).type('Rubber').should('have.value', 'Rubber');

      cy.get(`[data-cy="userData3"]`).type('Vista Games').should('have.value', 'Vista Games');

      cy.get(`[data-cy="userData4"]`).type('31801').should('have.value', '31801');

      cy.get(`[data-cy="userData5"]`).type('30535').should('have.value', '30535');

      cy.get(`[data-cy="initialQuantity"]`).type('38670').should('have.value', '38670');

      cy.get(`[data-cy="msdLevel"]`).type('methodologies Practical payment').should('have.value', 'methodologies Practical payment');

      cy.get(`[data-cy="msdInitialFloorTime"]`).type('Fantastic Netherlands Account').should('have.value', 'Fantastic Netherlands Account');

      cy.get(`[data-cy="msdBagSealDate"]`).type('Loan').should('have.value', 'Loan');

      cy.get(`[data-cy="marketUsage"]`).type('withdrawal Licensed').should('have.value', 'withdrawal Licensed');

      cy.get(`[data-cy="quantityOverride"]`).type('20234').should('have.value', '20234');

      cy.get(`[data-cy="shelfTime"]`).type('intuitive').should('have.value', 'intuitive');

      cy.get(`[data-cy="spMaterialName"]`).type('Future').should('have.value', 'Future');

      cy.get(`[data-cy="warningLimit"]`).type('5th microchip and').should('have.value', '5th microchip and');

      cy.get(`[data-cy="maximumLimit"]`).type('Texas architectures Berkshire').should('have.value', 'Texas architectures Berkshire');

      cy.get(`[data-cy="comments"]`).type('salmon Tasty Designer').should('have.value', 'salmon Tasty Designer');

      cy.get(`[data-cy="warmupTime"]`).type('2023-10-16T04:09').should('have.value', '2023-10-16T04:09');

      cy.get(`[data-cy="storageUnit"]`).type('France niches').should('have.value', 'France niches');

      cy.get(`[data-cy="subStorageUnit"]`).type('application Towels').should('have.value', 'application Towels');

      cy.get(`[data-cy="locationOverride"]`).type('AI Planner').should('have.value', 'AI Planner');

      cy.get(`[data-cy="expirationDate"]`).type('generate Tuna').should('have.value', 'generate Tuna');

      cy.get(`[data-cy="manufacturingDate"]`).type('Account generate Gorgeous').should('have.value', 'Account generate Gorgeous');

      cy.get(`[data-cy="partClass"]`).type('Handmade').should('have.value', 'Handmade');

      cy.get(`[data-cy="sapCode"]`).type('1655').should('have.value', '1655');

      cy.get(`[data-cy="trangThai"]`).type('Forward invoice Handmade').should('have.value', 'Forward invoice Handmade');

      cy.get(`[data-cy="checked"]`).type('46866').should('have.value', '46866');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        chiTietLenhSanXuat = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', chiTietLenhSanXuatPageUrlPattern);
    });
  });
});
