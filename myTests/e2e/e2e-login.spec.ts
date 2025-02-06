import { test, expect } from 'playwright/test'
import { testdata } from '../data/data'
import { locators } from '../data/locators'

test.describe("Login /Logout flow", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.automationexercise.com/")

    })
    test("Naviage secenrio", async( { page } ) => {
        expect(page.getByAltText('Website for automation practice')).toBeVisible()
        await page.getByText('Test Cases').first().click()
        const testcase1 = await page.locator('a[data-toggle="collapse"] u').first().innerText()
        expect(testcase1).toEqual('Test Case 1: Register User')
        await page.locator('a[data-toggle="collapse"] u').first().click()
        await page.locator('#collapse1').first().click()
        const firstStep = await page.locator('ul[class="list-group"] li').first().innerText()
        expect(firstStep).toEqual('1. Launch browser')
        await page.locator('#scrollUp').click()
        await page.locator('i[class="fa fa-home"]').click()
        
    })

    test("Category Test case", async( {page}) => {
        expect(page.getByAltText('Website for automation practice')).toBeVisible()
        expect(page.locator('div[class="left-sidebar"] h2').first()).toBeVisible()
        await page.locator('a[href="#Women"]').click()
        const categroyList : string[] = []
        for(let i=0; i<3; i++) {
            const womenCategory = await page.locator('div[class="panel-body"] ul li').nth(i).innerText()
            categroyList.push(womenCategory)
        }
        expect(testdata.Category1).toEqual(categroyList)
    })

    test("Add to cart", async( {page}) => {
        expect(await page.getByAltText('Website for automation practice')).toBeVisible()
        expect(await page.locator('div[class="left-sidebar"] h2').first()).toBeVisible()
        await page.locator('a[href="#Women"]').click()
        await page.locator('.choose').first().click()
        const cost = (await page.locator('span span').innerText())
        await page.locator('#quantity').fill('2')
        await page.locator('button[class="btn btn-default cart"]').click()
        expect(await page.locator('h4[class="modal-title w-100"]')).toContainText('Added!')
        await page.locator('a[href="/view_cart"]').nth(1).click()
        const total = await page.locator(locators.cartTotalPrice).innerText()
        expect(parseInt(total.substring(4,8))).toEqual(parseInt(cost.substring(4,8))*2)

    })

})