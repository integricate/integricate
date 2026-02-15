#!/usr/bin/env python3
import requests
import json
import sys
from datetime import datetime

class IntegricateAPITester:
    def __init__(self, base_url="https://43669e70-2624-4c1e-bd67-70e9a1773889.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Failed - Unsupported method: {method}")
                return False, {}

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"   Response Data: {json.dumps(response_data, indent=2)}")
                    
                    # Check for expected keys in response
                    if expected_keys:
                        for key in expected_keys:
                            if key not in response_data:
                                print(f"❌ Failed - Missing expected key: {key}")
                                return False, response_data
                    
                    self.tests_passed += 1
                    print(f"✅ Passed")
                    return True, response_data
                    
                except json.JSONDecodeError:
                    if expected_status == 200:
                        print(f"❌ Failed - Invalid JSON response")
                        return False, {}
                    else:
                        self.tests_passed += 1
                        print(f"✅ Passed")
                        return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response Text: {response.text[:500]}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_keys=["status"]
        )

    def test_contact_form_submission(self):
        """Test /api/contact endpoint with valid data"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "testuser@example.com",
            "subject": "Test Contact Form",
            "message": "This is a test message from the automated testing system."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data,
            expected_keys=["success", "message"]
        )

    def test_contact_form_validation(self):
        """Test /api/contact endpoint with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",
            "message": ""
        }
        
        # This should still work with current backend implementation
        # Backend doesn't have strict validation currently
        return self.run_test(
            "Contact Form with Invalid Data",
            "POST", 
            "api/contact",
            200,
            data=invalid_data
        )

    def test_sitemap_endpoint(self):
        """Test /api/sitemap endpoint"""
        return self.run_test(
            "Sitemap Data",
            "GET",
            "api/sitemap",
            200,
            expected_keys=["sections"]
        )

    def test_contacts_endpoint(self):
        """Test /api/contacts endpoint (if accessible)"""
        return self.run_test(
            "Get Contacts List",
            "GET",
            "api/contacts",
            200,
            expected_keys=["contacts"]
        )

def main():
    print("🚀 Starting Integricate API Tests")
    print("=" * 50)
    
    tester = IntegricateAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_endpoint,
        tester.test_sitemap_endpoint,
        tester.test_contact_form_submission,
        tester.test_contact_form_validation,
        tester.test_contacts_endpoint,
    ]
    
    for test in tests:
        test()
    
    # Print final results
    print(f"\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())